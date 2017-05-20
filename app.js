const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const debug = require('debug')('node-club-express:server');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

class NodeClubServer {

  static normalizePort(originPort) {
    let port = parseInt(originPort, 10);
    if (isNaN(port)) {
      return originPort;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }

  static start(app, port) {
    return new Promise((resolve, reject) => {
      let serverPort = NodeClubServer.normalizePort(port);
      debug(`server port ===>${serverPort}`);
      app.set('port', serverPort);

      let server = http.createServer(app);
      server.listen(serverPort);
      server.on('error', reject);
      server.on('listening', () => resolve(server));
    });
  }
}

const port = process.env.NODE_PORT || 3300;

NodeClubServer.start(app, port).then((server) => {

  let address = server.address();
  let bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
  debug('Listening on ' + bind);

}).catch((error) => {

  if (error.syscall !== 'listen') {
    return
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      debug(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(bind + ' is already in use');
      process.exit(1);
      break;
  }
});
