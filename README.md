# Server

Nodejs server for sub-reddit RESTful APIs

## Mongo DB

This probject uses mongodb for storage. To run mongo db in docker container, please run following command

docker run -d -v <HOST_FOLDER>:<CONTAINER_FOLDER> --name <MONGODB_CONTAINER_NAME> mongo
e.g.
docker run -d -p 27017:27017 -v /tmp:/data/db --name mongodb mongo
