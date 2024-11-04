FROM node:20.18

RUN apt update && apt install zip

WORKDIR /home/node/app/

COPY package*.json ./

RUN npm ci --omit=dev --no-audit

RUN mkdir nodejs

RUN mv node_modules nodejs/

RUN rm package*.json

RUN zip -r /home/node/nodejs_node_modules.zip .
