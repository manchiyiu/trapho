FROM node

# Create app directory
RUN npm install -g yarn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN yarn install
RUN yarn global add serve vbuild

# Bundle app source
COPY ./ /usr/src/app
RUN yarnpkg build

EXPOSE 3000
CMD [ "yarnpkg", "start" ]