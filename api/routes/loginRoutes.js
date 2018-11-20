var express = require('express');
var router = express.Router();
var User = require("../models/user");
var jwt = require('jsonwebtoken');
var getToken = require('../helper').getToken;
var resources = require('../controllers/resources/resources');
var passport = require('passport');
require('./passport')(passport);

function userDataToSend({
  username,
  firstName,
  lastName,
  motorcycles
}) {
  return {
    username,
    firstName,
    lastName,
    motorcycles
  }
}

router.post('/', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toObject(), resources.secret);
          // return the information including token as JSON
          res.json({...userDataToSend(user), token: 'JWT ' + token});
        } else {
          res.status(401).send({msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/user', passport.authenticate('jwt', { session: true }), function(req, res) {
  if(req.user) {

    res.json({...userDataToSend(req.user)});
  } else {
    res.status(401).send({msg: 'Unauthorized'});
  }
});

module.exports = router;


