# csci3100-project

## Basic architecture

Frontend

* frontend

Backend

* api-gateway
* microservices
  * activity-microservice
  * ...

## Instruction

### Requirements

Please install the following tools before proceding:

* [Docker](https://www.docker.com/)
* [NodeJS 7.5.0 (current)](https://nodejs.org/en/)

After doing so, run this:
```bash
sudo npm -g install yarn
yarn global add serve
```

### Starting the whole system (production build)

Do the following:

```bash
docker-compose build # will build all the docker iamges
docker-compose up # start the docker images
```

Then, you can access the frontend at `localhost:5000` and the backend at `localhost:4000`.

### Developing one specific module

I recommend using docker-compose to directly serve the whole system so that you don't have to manually start a mongodb instance or other microservices. However, if you insist:

For the microservices, you can start the server by doing the following:
```bash
cd [microservice-folder]
yarn install
yarnpkg start
```

For frontend, you can start a development server (with live-reload) with:
```bash
cd frontend
yarn install
yarnpkg dev
```