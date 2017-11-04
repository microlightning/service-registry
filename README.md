# Turbosonic: service-registry [![Build Status](https://secure.travis-ci.org/microlightning/service-registry.png?branch=master)](https://travis-ci.org/microlightning/service-registry)
## Description
A reverse proxy to orchistrate microservices easily by utilising:
* Self registration of microservices
* Fast reverse proxy

## Test
```bash
npm test
```

## Run
Best run using Docker
```bash
docker-compose up
```

## Code
There are no tricks, this is a very simple node application which acts as the core to a simple microservice environment.

## Folders

* `./src` is where the logic for the application resides and is where the unit tests are primary focused.
* `./test` is where tests can be found, both unit and functional as well as some helpers.
* `./tools` is where dependencies are stored, e.g. connectors to RabbitMQ and Redis.