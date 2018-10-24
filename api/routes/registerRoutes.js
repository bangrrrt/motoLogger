var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.post('/', function(req, res) {
  const { username, password, firstName, lastName } = req.body;

  if (!username && !password && !firstName && !lastName) {
    res.json({success: false, msg: 'First name, last name, username and password are required.'});
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
        return res.json({ success: false, errors: err.errors });
      }

      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

module.exports = router;