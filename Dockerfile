FROM node:16.8.0-alpine
WORKDIR /app
COPY package.json .
#RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ];     \
        then npm install;                   \
        else npm install --only=production; \
    fi
COPY . .
ENV PORT 3000
EXPOSE $PORT 
CMD ["npm", "run", "dev"]

#
# docker build -t node-app-image . 
# 
# docker run -d --name node-app --rm -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 node-app-image 
# docker run -d --name node-app --rm -v /app/node_modules -v $(pwd):/app:ro -p 3000:3000 node-app-image
#
# docker run -d --name node-app --rm -v $(pwd):/app:ro -v /app/node_modules -p 3000:4000 --env PORT=4000 node-app-image
# docker run -d --name node-app --rm -v $(pwd):/app:ro -v /app/node_modules -p 3000:4000 --env-file ./.env node-app-image
#
# docker exec -it node-app sh 
# docker exec -it node-app printenv
#
# docker rm node-app -fv
# 