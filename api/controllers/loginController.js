var User = require("../models/user");
var jwt = require('jsonwebtoken');
var resources = require('../controllers/resources/resources');
var UserDataToSend = require('./helper').userDataToSend;

// Authenticates the user via password
exports.login = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json(401, 'Authentication failed. User not found.');
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toObject(), resources.secret);
          // return the information including token as JSON
          res.json({...UserDataToSend(user), token: 'JWT ' + token});
        } else {
          res.json(401, 'Authentication failed. Wrong password.');
        }
      });
    }
  });
}

// Returns the authenticated user's info
exports.getUser = function(req, res) {
  if(req.user) {
    res.json({...UserDataToSend(req.user)});
  } else {
    res.json(401, 'User not found.');
  }
}