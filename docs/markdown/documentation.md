## REST API

OpenAPI/Swagger documentation can be found at `docs/openapi/openapi-docs.json`

### How to visualize the documentation

```sh
docker compose up -d openapi
```

The documentation can be viewed at `http://localhost:8081/`.

### How to generate the documentation

First, start each app in development mode to generate an individual `openapi-docs.json` for the app

To start the app, see how to [run with standalone Node](./how-to-run.md) documentation to know how to create the external dependencies

After creating the dependencies, run:

```sh
npm run start:dev:login
npm run start:dev:logout
```

When the message showing the port that service is running is show, the execution can be stopped, and the json file will have been already generated

Now is necessary to merge all json files into one. For this, run:

```sh
docker compose build openapi-merge
docker compose up openapi-merge
```

After this, the `docs/openapi/openapi-docs.json` file will be updated
