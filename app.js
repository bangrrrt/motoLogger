var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session')
var resources = require('./api/controllers/resources');
var enforce = require('express-sslify');

// Load log routes
var logRoutes = require('./api/routes/logRoutes');

// Login route
var loginRoutes = require('./api/routes/loginRoutes');

// Logout route
var logoutRoutes = require('./api/routes/logoutRoutes');

// Register route
var registerRoutes = require('./api/routes/registerRoutes');
var motorcycleRoutes = require('./api/routes/motorcycleRoutes');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'client'));
// app.set('view engine', 'jade');

// Enforce SSL in production
if (app.get('env') !== 'development') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(session({
  maxAge: 60000,
  secret: resources.secret
}));
app.use(cookieParser());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(`${__dirname}/client`, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));

/* Auth passport  */
// var api = require('./routes/api');
mongoose.connect(resources.dbURL, { useMongoClient: true });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.get('/', function(req, res) {
  res.send('Page under construction.');
});

// Log api
app.use('/api/logs', logRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/motorcycles', motorcycleRoutes);
app.set('view engine', 'jade');

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Sorry, not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
