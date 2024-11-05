# How to run (local development)

## Setup

1. Run `npm install` at the project root
2. Copy the file `model.env.json` to `.env.json`
3. Change values at `deploymnet/local-dev/.env` and `.env.json` if needed

The file `deploymnet/local-dev/.env` is used by the local Docker containers and to run the code as individual Node applications  
The file `.env.json` is used to pass variables to the serverless framework

Local dependencies can be started with:

- PostgreSQL database: `docker compose --env-file ./deployment/local-dev/.env up -d database-auth`. The database will be started with the `.sql` files from `deployment/database/authentication`
- Redis: `docker compose --env-file ./deployment/local-dev/.env up -d redis`
- Redis UI: `docker compose up -d redis-ui`. It can be accessed at [http://localhost:7843](http://localhost:7843)

## Run with standalone Node

All apps can be started as a Node.js application for test purposes and will export the REST API in a specific port

Run `npm run start:dev:$APP` changing `$APP` for the desired app to run. The options for `$APP` are:

| app    | port |
| :----- | :--: |
| login  | 3001 |
| logout | 3002 |

The code will be compiled and executed from `dist/apps/$APP/main.js`

## Run with Serverless Offline

**OBS**: Serverless Framework requires authentication to be used at the command line. Read more at [getting started with serveless framework](https://www.serverless.com/framework/docs/getting-started#signing-in)

Compile the code with `npm run build:login` and `npm run build:logout`

Run `npx serverless offline` to get the endpoints to access the local lambda functions

The code will be executed from `dist/apps/$APP/lambda.js`
