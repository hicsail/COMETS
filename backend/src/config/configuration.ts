export default () => ({
  database: {
    uri: process.env.MONGO_URI
  },
  frontend: {
    baseURL: process.env.FRONT_END_URL
  },
  flask: {
    baseURL: process.env.FLASK_URL
  }
});

