# Use an official Node runtime as a parent image
FROM node:18 AS build-stage
WORKDIR /app

COPY package*.json ./


RUN npm ci

COPY . .
ARG NODE_ENV=production
RUN npm run build

# Start a new stage for a smaller image size
FROM node:18-alpine as production-stage

ARG NODE_ENV=production
WORKDIR /app
COPY --from=build-stage /app /app
EXPOSE 3000

CMD if [ "$NODE_ENV" = "development" ] ; then npm run dev ; else npm start ; fi
