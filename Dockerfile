FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run-script build-prod

FROM nginx:stable-alpine AS deploy-stage
COPY ./default.conf /etc/nginx/conf.d
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]