FROM node:7.3.0

MAINTAINER Matheus Lucca do Carmo <mematheuslc@gmail.com>

RUN mkdir /usr/src/shorts

ADD . /usr/src/shorts

RUN cd /usr/src/shorts

RUN chmod +xr /usr/src/shorts/bin/www

RUN npm install -g yarn

RUN yarn

EXPOSE 3000

VOLUME /usr/src/shorts

WORKDIR /usr/src/shorts

CMD yarn run start