var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.post('/', function(req, res) {
  const { username, password, firstName, lastName } = req.body;

  if (!username && !password && !firstName && !lastName) {
    res.json('First name, last name, username and password are required.');
  } else {
    var newUser = new User({
      username,
      password,
      firstName,
      lastName
    });

    // save the user
    newUser.save(function(err) {
      if (err) {
        res.status(400);
        return res.json(err.errors);
      }

      res.json('Successful created new user.');
    });
  }
});

module.exports = router;

exports.me = function(req,res){
  if (req.headers && req.headers.authorization) {
      var authorization = headers.authorization,
          decoded;
      try {
          decoded = jwt.verify(authorization, secret.secretToken);
      } catch (e) {
          return res.status(401).send('unauthorized');
      }
      var userId = decoded.id;
      // Fetch the user by id 
      User.findOne({ username: username }).then(function(user){
          // Do something with the user
          return res.send(200);
      });
  }
  return res.send(500);
}