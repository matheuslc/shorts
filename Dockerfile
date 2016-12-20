FROM node:latest

MAINTAINER Matheus Lucca do Carmo <mematheuslc@gmail.com>

VOLUME /usr/src/shorts

ADD . /usr/src/shorts

RUN cd /usr/src/shorts

RUN chmod +x /usr/src/shorts/bin/www

RUN npm install -g yarn

RUN yarn

EXPOSE 3000

WORKDIR /usr/src/shorts

CMD yarn run start