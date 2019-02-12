var jwt = require('jsonwebtoken');
var User = require('../models/user');
var resources = require('./resources/resources');
var UserDataToSend = require('./helper').userDataToSend;

// Register user
exports.addUser = function(req, res) {
  const { username, password, firstName, lastName } = req.body.userData;
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
    newUser.save(function(err, user) {
      // Duplicate user
      if (err && err.code === 11000) {
        return res.json(400, "This email is already registered");
      }

      if (err) {
        return res.json(400, err);
      }
      var token = jwt.sign(user.toObject(), resources.secret);
      res.json({...UserDataToSend(user), token: `JWT ${token}` });
    });
  }
}
