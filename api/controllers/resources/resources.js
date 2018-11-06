const dbResources = {
  logCollection: 'logs',
  usersCollection: 'users',
  dbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/motoMaintenance',
  secret: 'nodesecret' // add to Heroku env file
};

module.exports = dbResources;
