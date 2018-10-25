const dbResources = {
  dataBase: 'heroku_r020v8q8',
  logCollection: 'logs',
  usersCollection: 'users',
  dbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/motoMaintenance',
  secret: 'nodesecret'
};

module.exports = dbResources;
