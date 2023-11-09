FROM node:18.16.1-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache yarn

COPY ../package.json ../yarn.lock ./

RUN yarn install  

COPY ./src/api ./src/api

COPY ./test/api ./test/api

EXPOSE 8080


CMD [ "yarn", "start" ]
