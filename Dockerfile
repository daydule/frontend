FROM node:18.15-alpine

WORKDIR /daydule/

COPY ./package*.json ./
RUN npm ci
