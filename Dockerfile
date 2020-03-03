###FROM nginx:1.17.1-alpine
###COPY /dist/openWeatherApp /usr/share/nginx/html

### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY . .
RUN yarn build --prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/openWeatherApp /usr/share/nginx/html
