var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var dbResources = require('./resources/resources');
var { dbURL, usersCollection, dataBase } = dbResources;

// Register 
exports.REGISTER_USER = function(req, res) {
  mongo.connect(dbURL, function(err, client) {
    if (err) {
      res.send(err);
    }
    
    client.db(dataBase).collection(usersCollection)
    
    res.send('register');
    client.close();
  });
};
