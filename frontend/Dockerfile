FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
# VITE_API_URL se resuelve en el navegador del usuario, no dentro del contenedor — el default
# (http://localhost:8080) ya apunta bien al api-gateway cuando docker-compose mapea ese puerto
# al host. Si el gateway se publica en otro lado, pasar --build-arg VITE_API_URL=... acá.
ARG VITE_API_URL=http://localhost:8080
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
