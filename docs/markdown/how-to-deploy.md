# How to deploy

`THIS IS A PROJECT FOR LEARNING PURPOSES, SO THERE IS HARDCODED SIMULATED SENSITIVE INFORMATION`

## Generate AWS Lambda layer with node_modules and AWS cerificates

As AWS Lambda runtime executes with Amazon Linux, all node_modules libraries need to be for Linux. To avoid using the node_modules from local project, this project ensures the use of a node_modules for Linux using Docker.

The following command generates the node_modules with a major NodeJS official Docker image and create a zip file already with the required structure to be used as an AWS Lambda Layer.

It also bundles the [AWS RDS certificates](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html#UsingWithRDS.SSL.CertificatesDownload) for a specific region that need to be set at the `AWS_REGION` variable at the file `deployment/local-dev/.env'

```sh
docker compose --env-file ./deployment/local-dev/.env build aws-lambda-layer
```

The following command copies the generated zip file inside the Docker image and put it at the path that Serverless Framework sets as artifact (/aws-lambda-layer/aws-lambda-layer.zip).

```sh
docker create --name aws_lambda_layer_tmp aws-lambda-layer:latest
docker cp aws_lambda_layer_tmp:/home/aws-lambda-layer.zip ./aws-lambda-layer/aws-lambda-layer.zip
docker rm aws_lambda_layer_tmp
```

## Create the infrastructure

This project needs a SQL database and a Redis cache.

The required infrastructure can be created at Amazon AWS using terraform. All commands should be executed inside the directory `deployment/terraform`

```sh
terraform init
terraform plan
terraform apply
```

After the infrastructure creation, the database needs to be **MANUALLY** populated. After the infrastructure creation, the database needs to be **MANUALLY** populated. For this, connect to the database when execute the files from the directory `deployment/database/authentication/`

## Build the code

```sh
npm run build:login
npm run build:logout
```

## Deploy

Before running the deploy command, it is required to set the `securityGroupIds` and `subnetIds` at the `serverless.yml` file

```yml
vpc:
  securityGroupIds:
    - sg-0bb02e3f7ef39fabc
  subnetIds:
    - subnet-0c19620347ff05abc
```

After the configuration, run:

```sh
serverless deploy
```
