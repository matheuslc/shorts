FROM node:latest

VOLUME "/usr/src/url-shortener"

ADD entrypoint.sh /entrypoint.sh

RUN npm install -g yarn
RUN chmod +x /entrypoint.sh

EXPOSE 80
WORKDIR "/usr/src/url-shortener"

CMD ["/entrypoint.sh", "npm start"]