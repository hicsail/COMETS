export default () => ({
  database: {
    uri: process.env.MONGO_URI
  },
  frontend: {
    baseURL: process.env.FRONT_END_URL
  },
  flask: {
    baseURL: process.env.FLASK_URL
  },
  email: {
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
  },
  cors: {
    allowedOrigin: process.env.ALLOWED_ORIGIN
  }
  // redis: {
  //   host: process.env.REDIS_HOST
  // }

});

