# Notes from Underground

![Notes from Underground](img/Notes_from_Underground.jpg)

## I. Development 

```console
# Create and start containers
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d 

# Create and start containers. 
# Build images before starting containers
# Recreate anonymous volumes instead of retrieving data from the previous containers.
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V

# Scale SERVICE to NUM instances. Overrides the "scale" setting in the Compose file if present.
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2

# Validate and view the Compose file
docker-compose -f docker-compose.yml -f docker-compose.dev.yml config

# Start service "node-app". Do not start linked services.
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-deps node-app

# Start servcie "mongo"
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d mongo

# View output from containers
docker-compose logs node-app 

# Execute a command in a running container 
docker-compose exec node-app printenv

# Execute a command in a running container 
docker-compose exec mongo mongo -u root -p root 
...
    db.books.insert({"name": "Harry Potter"});
...

# Stop and remove containers, networks, images, and volumes
# Remove named volumes declared in the "volumes" section of the Compose file and 
# anonymous volumes attached to containers.
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```


## II. Production (Standalone mode) 

```console
# 
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d 
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d 
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app
# docker-compose --verbose -f docker-compose.yml -f docker-compose.prod.yml up -d
# docker-compose --verbose --log-level=DEBUG -f docker-compose.yml -f docker-compose.prod.yml up -d
# 
#2 docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml config > dev.yml
#
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-deps node-app
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d mongo
#
# docker-compose logs node-app 
# docker-compose exec node-app printenv
# docker-compose exec mongo mongo -u root -p root 
# db.books.insert({"name": "Harry Potter"});
#
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
```


## III. Production (Docker mode) 

[http](http://132.145.115.172/api/v1)

[https](https://132.145.115.172:443/api/v1)

[visualizer](http://132.145.115.172:8080)

```console
cd myapp 

# 1) Node
# List nodes in the swarm
docker node ls
```

```console
# 2) Stack 
# Deploy a new stack or update an existing stack
docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml myapp

# List stacks
docker stack ls 

# List the tasks in the stack
docker stack ps myapp

# List the services in the stack
docker stack services myapp

# Remove one or more stacks
docker stack rm myapp
```

```console
# 3) Service
# List services
docker service ls

# List the tasks of one or more services
docker service ps myapp_node-app

# Fetch the logs of a service or task
docker service logs mmyapp_node-app

# Scale one or multiple replicated services
docker service scale myapp_node-app=4
docker service scale myapp_nginx=2
```
![docker service scale](img/docker_service_scale.png)

## IV. Reference
1. [Learn Docker - DevOps with Node.js & Express](https://www.youtube.com/watch?v=9zUHg7xjIqQ&t=356s)
2. []() 
3. []() 
4. []()
5. [[v1.25.0] "Only pull images that can't be built" should be optional #7103](https://github.com/docker/compose/issues/7103) 
6. [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/) 


## EOF (2022/06/24)



#
# [v1.25.0] "Only pull images that can't be built" should be optional #7103
# https://github.com/docker/compose/issues/7103
# 
# It seems to be due to the Only pull images that can't be built feature of v1.25.0 (v1.24.1 doesn't have this issue).
# yep, confirmed. 1.25.1-rc1 solves the issue. Waiting for stable release 
#
# So, if you want to use docker-compose pull node-app in production environment, 
# be sure to COMMENT OUT line 17~20.
# 
# EOF (2022/05/08)
#





