FROM node:10.5-alpine
LABEL maintainer="docker@lagden.in"

ARG NODE_ENV=production
ARG PORT=3000
ARG BASE=/home/node

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV BASE=$BASE
ENV APP=$BASE/app
ENV NPM_CMD="npm i --progress=false --quiet"

EXPOSE $PORT 9229

# RUN npm i -g npm
RUN mkdir -p $APP
COPY . $APP

WORKDIR $APP
RUN chown -R node:node $BASE

USER node
RUN $NPM_CMD
