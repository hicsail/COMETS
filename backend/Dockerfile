FROM node:18-alpine3.16

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm run start:prod

# FROM mongo

# # Copy the custom entrypoint script to the container
# COPY entrypoint.sh /docker-entrypoint-initdb.d/

# # Make the entrypoint script executable
# RUN chmod +x /docker-entrypoint-initdb.d/entrypoint.sh

# CMD ["./docker-entrypoint-initdb.d/entrypoint.sh"]
