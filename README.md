![](docs/markdown/images/serverless-framework.png)

# NestJS Monorepo and Serveless Framework

This project is REST API built using NestJS, structured as a monorepo. Each endpoint is deployed as a separate AWS Lambda function, utilizing the Serverless Framework for seamless deployment and management. This architecture ensures scalability, flexibility, and easy maintenance, making it ideal for modern applications requiring secure user authentication.

## Key features

- **Modular Architecture**: Organized as a monorepo for easy development and management of multiple services.
- **RESTful Endpoints**: Provides a full set of authentication endpoints including user registration, login, password reset, and token management.
- **AWS Lambda Integration**: Each endpoint is deployed as a distinct Lambda function, allowing for efficient scaling and cost-effectiveness.
- **Serverless Framework**: Simplifies deployment and configuration of AWS resources, enabling quick and reliable updates.

## Technology Stack

- Code organization: monorepo with [NestJS workspaces](https://docs.nestjs.com/cli/monorepo#monorepo-mode)
- Backend: REST API, Node.js, [NestJS Framework](https://docs.nestjs.com/), TypeScript
- Database and cache: PostgreSQL, Redis, [TypeORM](https://typeorm.io/)
- Security: [JWT](https://jwt.io/) and [BCrypt](https://www.npmjs.com/package/bcrypt)
- Tests: TO DO
- CI/CD: TO DO
- Documentation: TO DO
- Others: TO DO

## General organization

The project has two endpoints, each one is an app inside the monorepo and run in its own lambda function:

- **Login**: receives username and password and issue an access token
- **Logout**: invalidates the token that made the logout

## DevOps flow

TO DO

## Documentation about

- [How to contribute](./CONTRIBUTING.md)
- [How to run from code](docs/markdown/how-to-run.md)
- [How to deploy](docs/markdown/how-to-deploy.md)
