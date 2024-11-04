# How to deploy

## Generate node_modules

As AWS Lambda runtime executes with Amazon Linux, all node_modules libraries need to be for Linux. To avoid using the node_modules from local project running with Windows, this project ensures the use os a node_modules for Linux using Docker.

The following command generates the node_modules with a major NodeJS official Docker image and create a zip file already with the required structure to be used as an AWS Lambda Layer.

```sh
docker compose build aws-node-modules
```

The following command copies the generated zip file inside the Docker image and put it at the path that Serverless Framework sets as artifact (/aws_node_modules/nodejs_node_modules.zip).

```sh
docker create --name aws_node_temp aws-node-modules:latest
docker cp aws_node_temp:/home/node/nodejs_node_modules.zip ./aws_node_modules/nodejs_node_modules.zip
docker rm aws_node_temp
```
