FROM node:latest

VOLUME "/usr/src/shorts"

RUN cd /usr/src/shorts

RUN npm install -g yarn

RUN yarn

EXPOSE 9005

WORKDIR "/usr/src/url-shortener"

CMD ["npm start"]