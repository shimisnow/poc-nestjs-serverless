![](docs/markdown/images/serverless-framework.png)

# NestJS Monorepo and Serveless Framework

This monorepo contains a set of **REST APIs microservices** built with **NestJS**, deployed using the **Serverless Framework** with **AWS Lambda** and **API Gateway** for app-specific infrastructure. The project shared infrastructure is managed with **Terraform**, integrating **AWS RDS** for relational database services and **AWS ElastiCache** for distributed caching. It is designed to streamline the deployment and management of serverless applications, offering seamless API integration, infrastructure provisioning, and efficient scaling on AWS.

## Technology Stack

- Serverless deployment: [Serverless Framework](https://www.serverless.com/), [Webpack](https://webpack.js.org/)
- Infrastructure as code (IaC): [Terraform](https://www.terraform.io/)
- AWS Cloud: [Lambda](https://aws.amazon.com/lambda/) functions and layers, [API Gateway](https://aws.amazon.com/api-gateway/), [RDS](https://aws.amazon.com/rds/), [ElastiCache](https://aws.amazon.com/elasticache/)
- Backend: [NestJS Framework](https://docs.nestjs.com/), Node.js, REST API, TypeScript
- Code organization: monorepo with [NestJS workspaces](https://docs.nestjs.com/cli/monorepo#monorepo-mode)
- Database and cache: PostgreSQL, Redis, [TypeORM](https://typeorm.io/)
- Security: [JWT](https://jwt.io/) and [BCrypt](https://www.npmjs.com/package/bcrypt)
- Tests: Unit and integration testing ([Jest](https://jestjs.io/))
- Documentation: Markdown, [Mermaid (diagram-as-code)](https://mermaid.js.org/)
- Others: Docker

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
    state "Build node modules in Linux environment" as node_modules_build
    state "Export node modules to zip file" as node_modules_zip
    [*] --> node_modules_build
    node_modules_build --> node_modules_zip
    node_modules_zip --> [*]
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
