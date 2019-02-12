const dbResources = {
  logCollection: 'logs',
  usersCollection: 'users',
  dbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/motoMaintenance',
  secret: process.env.SECRET || 'secret'
};

module.exports = dbResources;
