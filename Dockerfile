FROM node:18.12-alpine

WORKDIR /daydule/

COPY ./package*.json ./
RUN npm ci
