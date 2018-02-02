FROM node:8.9.1-alpine
LABEL maintainer="docker@lagden.in"

ARG npm_cmd="npm i --progress=false --quiet --production"

ENV HOME=/home/node
ENV APP=$HOME/app

RUN mkdir $APP
COPY . $APP
RUN chown -R node:node $HOME

USER node
WORKDIR $APP
RUN $npm_cmd
