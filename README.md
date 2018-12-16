# csci3100-project

## Information for TA

* We have define all API endpoints for our backend server, which are available at `api-gateway/src/routes/*.ts`. We have also documented the input and output of each API endpoints, the API documentation is available here: http://ymcatar.github.io/trapho.

## Basic architecture

![](https://i.imgur.com/5S8SrXl.png)

## Instruction

### Requirements

Please install the following tools before proceding:

* [Docker](https://www.docker.com/)
* [NodeJS 7.5.0 (current)](https://nodejs.org/en/)

After doing so, run this:
```bash
sudo npm -g install yarn
yarn global add serve
yarn global add typescript
```

### Starting the whole system (production build)

Do the following:

```bash
docker-compose build # will build all the docker iamges
docker-compose up # start the docker images
docker-compose up -d --build --no-deps api-gateway # to rebulid and restart only api-gateway, etc.
```

Then, you can access the frontend at `localhost:5000` and the backend at `localhost:4000`.

### Developing one specific module

I recommend using docker-compose to directly serve the whole system so that you don't have to manually start a mongodb instance or other microservices. However, if you insist:

For the microservices, you can start the server by doing the following:
```bash
cd [microservice-folder]
yarn install
yarn start
```

For frontend, you can start a development server (with live-reload) with:
```bash
cd frontend
yarn install
yarn dev
```
