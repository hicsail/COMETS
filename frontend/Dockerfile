#  ./frontend/Dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install


COPY . .

EXPOSE 5173
RUN npm run build 
CMD [ "npm", "run", "preview", "--host"]