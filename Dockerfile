FROM node:12

ENV SIMULATOR_PORT=9087

WORKDIR /tmp/mockserver

COPY package*.json /tmp/mockserver/

RUN npm install

COPY *.js /tmp/mockserver/

EXPOSE 9087
CMD [ "node", "/tmp/mockserver/mockserver.js" ]