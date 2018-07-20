FROM node:latest

# use nodemon for development
RUN npm install --global nodemon

# use cached layer for node modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr && cp -a /tmp/node_modules /usr

# add project files
WORKDIR /usr
ADD . /usr

EXPOSE 3000

CMD ["nodemon", "-L", "server.js"]