# # build environment
# FROM node:14.16.0-alpine as build
# WORKDIR /client/app
# ENV PATH /client/app/node_modules/.bin:$PATH
# COPY package.json /client/app/package.json
# COPY package-lock.json /client/app/package-lock.json
# RUN npm ci --silent
# RUN npm install react-scripts@3.4.3 -g --silent
# COPY . /client/app
# RUN npm run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /client/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:14.16.0-alpine

ENV NODE_ENV production

WORKDIR /server/app

COPY package.json /server/app/package.json
COPY package-lock.json /server/app/package-lock.json

RUN npm install

COPY . /server/app

CMD [ "npm", "start" ]