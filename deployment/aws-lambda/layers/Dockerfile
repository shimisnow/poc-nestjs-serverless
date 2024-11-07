FROM node:20.18

ENV AWS_REGION=us-east-1
ENV AWS_PKI_BASE_URL=https://truststore.pki.rds.amazonaws.com

#################
##### SETUP #####
#################

RUN apt update && apt install -y wget zip

# stores node_modules and Amazon AWS Certificate bundles
RUN mkdir -p /layer/nodejs/certs

###################################
##### NODE_MODULES GENERATION #####
###################################

# uses an intermediary folder to generates the files
WORKDIR /home/node/app/

COPY package*.json ./

RUN npm ci --omit=dev --no-audit

RUN mv node_modules /layer/nodejs/

##################################
##### AMAZON AWS CERTIFICATE #####
##################################

RUN wget -P /layer/nodejs/certs $AWS_PKI_BASE_URL/$AWS_REGION/$AWS_REGION-bundle.pem

#################################
##### CREATE LAYER ZIP FILE #####
#################################

RUN cd /layer && zip -r /home/aws-lambda-layer.zip .
