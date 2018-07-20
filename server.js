'use strict';

const 
  express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  compression = require('compression'),
  jsonwebtoken = require('jsonwebtoken'),
  bodyParser = require('body-parser'),
  // passport = require('passport'),
  // routes = require('./routes/index-mongodb-native'),
//   routes = require('./backend/routes/todos'),
  config = require('./config'),
  // Todo = require('./backend/models/todo'),
  // User = require('./backend/models/user'),

  app = express(),
  mysql = require('mysql'),
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'test_project_db',
    password : 'R$$T'
  });
//   users = require('./backend/routes/users');

// require('./backend/passports/user-passport');

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) {
      console.error(err);
  }
  console.log('The solution is: ', rows[0].solution);
});

connection.end();

// compress responses
app.use(compression());

// app.set('views', path.join(__dirname, 'backend/views'));
// app.set('view engine', 'pug');

// app.use(favicon(__dirname + '/backend/public/favicon.ico'));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, PATCH, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
  //   jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
  //     if (err) {
  //       req.user = undefined;
  //       req.user = decode;
  //       next();
  //     }
  //   });
  // } else {
  //   req.user = undefined;
  //   next();
  // }

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }

});

// app.use(passport.initialize());

// routes(app);

app.get('/', (res, req) =>{
    res.send('hello world');
});

// app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(async(req, res, next) => {
  try {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } catch (err) {
      console.error('err', err);
  }
});

//// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(async(err, req, res, next) => {
      try {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      } catch (err) {
        console.error('err', err);
      }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(async(err, req, res, next) => {
  try {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  } catch (err) {
    console.error('err', err);
  }
});

app.listen(config.port);
console.log(`Running on port ${config.port}`);

module.exports = app;