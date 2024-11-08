![](docs/markdown/images/serverless-framework.png)

# NestJS and Serveless Framework

## Technology Stack

- **Monorepo**: This is a [monorepo](https://docs.nestjs.com/cli/monorepo#monorepo-mode) containing multiple Lambda functions and shared infrastructure
- **REST API**: The functions are built using REST APIs to enable communication between components
- **NestJS**: Uses [NestJS framework](https://docs.nestjs.com/) for building scalable server-side application
- **Cloud-Native Architecture**: Built using cloud-native patterns and best practices to maximize the benefits of the cloud infrastructure, such as scalability and high availability
- **Serverless Framework**: Deployed using the [Serverless Framework](https://www.serverless.com/) for easy management of serverless applications
- **AWS Lambda**: Used for serverless function execution, where business logic is run in response to events
- **AWS API Gateway**: Used to create and manage APIs, providing endpoints for client applications to interact with the functions
- **Infrastructure as Code (IaC)**: Manages shared infrastructure using [Terraform](https://www.terraform.io/)
- **AWS Cloud**: Uses [RDS](https://aws.amazon.com/rds/) (relational database services), and [ElastiCache](https://aws.amazon.com/elasticache/) (distributed caching)
- **Tests**: Unit and integration testing ([Jest](https://jestjs.io/))
- **Documentation**: [OpenAPI](https://swagger.io/specification/), [Mermaid (diagram-as-code)](https://mermaid.js.org/)
- **Others**: [TypeORM](https://typeorm.io/), [Webpack](https://webpack.js.org/), [JWT](https://jwt.io/)

## Deployment flow

See details as [how to deploy](docs/markdown/how-to-deploy.md) in the deployment documentation.

```mermaid
stateDiagram-v2
direction LR

classDef docker_style fill:#1d63ed
classDef terraform_style fill:#7b42bc
classDef serverless_style fill:#fd5750

state "Docker" as docker_group {
    direction TB
    state "Build node_modules in Linux environment" as node_modules_build
    state "Download Amazon RDS Certificates" as rds_cert
    state docker_join <<join>>
    state "Export layer content to zip file" as layer_zip
    [*] --> node_modules_build
    [*] --> rds_cert
    node_modules_build --> docker_join
    rds_cert --> docker_join
    docker_join --> layer_zip
    layer_zip --> [*]
}
docker_group:::docker_style

state "Terraform" as terraform_group {
    state "Build shared infrastructure" as terraform_build
    state "Amazon RDS - PostgreSQL" as aws_database
    state "Amazon ElastiCache - Redis" as aws_cache
    state terraform_join <<join>>
    [*] --> terraform_build
    terraform_build --> aws_database
    terraform_build --> aws_cache
    aws_database --> terraform_join
    aws_cache --> terraform_join
    terraform_join --> [*]
}
terraform_group:::terraform_style

state start_fork <<fork>>
[*] --> start_fork
start_fork --> docker_group
start_fork --> terraform_group

state start_join <<join>>
docker_group --> start_join
terraform_group --> start_join

state "Build code" as build_code

start_join --> build_code

state "Deploy AWS Lambda Layer" as lambda_layer
state "Deploy AWS Lambda Function - Login" as lambda_login
state "Deploy AWS Lambda Function - Logout" as lambda_logout
state "Deploy AWS API Gateway" as api_gateway

state "Serverless Framework" as serverless_group {
    lambda_layer --> lambda_login
    lambda_layer --> lambda_logout
    state lambda_join <<join>>
    lambda_login --> lambda_join
    lambda_logout --> lambda_join
    lambda_join --> api_gateway
}
serverless_group:::serverless_style

build_code --> lambda_layer
api_gateway --> [*]
```

## General organization

The project has two endpoints for a simple [authentication flow](/docs/markdown/authentication-flow.md), each one is an app inside the monorepo and run in its own lambda function:

- **Login**: receives username and password and issue an access token
- **Logout**: invalidates the token that made the logout

```mermaid
stateDiagram-v2
direction LR

state "Consumer" as consumer
[*] --> consumer

state "AWS API Gateway" as aws_api_gateway {
    state "API Entrypoint" as api_entrypoint
    state "REST API login" as api_login
    state "REST API logout" as api_logout
    api_entrypoint --> api_login
    api_entrypoint --> api_logout
    api_login --> lambda_login
    api_logout --> lambda_logout
}

state "AWS Lambda" as aws_lambda {
    state "Function login" as lambda_login
    state "Function logout" as lambda_logout
}

state "AWS RDS" as aws_rds {
    state "PostgreSQL Database" as database
}

state "AWS ElastiCache" as aws_elasticache {
    state "Redis" as cache
}

lambda_login --> database
lambda_login --> cache

lambda_logout --> database
lambda_logout --> cache

consumer --> api_entrypoint
```

## Documentation about

- [How to contribute](./CONTRIBUTING.md)
- [How to run from code](docs/markdown/how-to-run.md)
- [How to deploy](docs/markdown/how-to-deploy.md)
- [OpenAPI documentation](docs/markdown/documentation.md)
