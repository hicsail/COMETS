FROM node:20 as build

WORKDIR /app

COPY . .

ARG VITE_COMETS_BACKEND
ARG VITE_COMETS_FLASK

ENV VITE_COMETS_BACKEND ${VITE_COMETS_BACKEND}
ENV VITE_COMETS_FLASK ${VITE_COMETS_FLASK}

RUN npm install
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD nginx -g 'daemon off;'
