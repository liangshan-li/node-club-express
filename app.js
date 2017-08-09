const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const debug = require('debug')('node-club-express:server');
const session=require('express-session');
const passport=require('passport');//身份通行证
const cors=require('cors');//解决跨域
const compress=require('compression');//压缩请求
const GitHubStrategy=require('passport-github').Strategy;//github 身份可用This module lets you authenticate using GitHub in your Node.js applications
const _=require('lodash');//lodash 工具
const ResponseTime=require('response-time');//记录请求的响应时间
const MethodOverride=require('method-override');//method-override可以将GET或者POST改成其他谓词PUT,DELETE等
const ErrorHandler=require('errorhandler');//仅用于开发环境下的错误处理
const Url=require('url');//URL 处理工具
const helmet=require('helmet');//Helmet helps you secure your Express apps by setting various HTTP headers
//
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable('trust proxy');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(ResponseTime());
app.use(helmet.frameguard('sameorigin'));
app.use(MethodOverride());
app.use(compress());
app.use(session({
  secret:'12345',
  store:null,
  resave:false,
  saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use('/', index);
//app.use('/users', users);

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
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

//start server
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
