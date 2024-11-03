# How to run

## Setup

1. Run `npm install` at the project root
2. Copy the file `model.env` to `.env`
3. Copy the file `model.env.json` to `.env.json`
4. Change values at `.env` and `.env.json` if needed

The file `.env` is used to deploy the local Docker database and to run the code as individual node applications  
The file `.env.json` is used to pass variables to the serverless framework

Local dependencies can be started with:

- PostgreSQL database: `docker compose up -d database-auth`. The database will be started with the `.sql` files from `deployment/database/authentication`
- Redis: `docker compose up -d redis`
- Redis UI: `docker compose up -d redis-ui`. It can be accessed at [http://localhost:7843](http://localhost:7843)

## Run the code with Node (test purpose)

All apps can be started as a Node.js application for test purposes and will export the REST API in a specific port.

Run `npm run start:dev:$APP` changing `$APP` for the desired app to run. The options for `$APP` are:

- login
- logout

The code will be compiled and executed from `dist/apps/$APP/main.js`

## Run the code Serverless Offline

**OBS**: Serverless Framework requires authentication to be used at the command line. Read more at [getting started with serveless framework](https://www.serverless.com/framework/docs/getting-started#signing-in)

Compile the code with `npm run build:login` and `npm run build:logout`

Run `npx serverless offline` to get the endpoints to access the lambda functions.

The code will be executed from `dist/apps/$APP/lambda.js`
