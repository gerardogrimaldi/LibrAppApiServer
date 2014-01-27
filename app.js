var express     = require('express');
var routes      = require('./routes');
var user        = require('./routes/user/user.js');
var http        = require('http');
var path        = require('path');
var mongoose    = require('mongoose');
<<<<<<< HEAD
=======
var passport    = require('passport');
>>>>>>> api server ready for first launch

mongoose.connect('mongodb://librapp:%#L1br4pp#%@ds047198.mongolab.com:47198/librapp');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
<<<<<<< HEAD

// CORS header securiy
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.get ('/api',            routes.index);
=======

// CORS header securiy
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.get ('/api',            passport.authenticate('local', { failureRedirect: '/login' }), routes.index);
>>>>>>> api server ready for first launch
app.get ('/api/users',      user.index);
app.get ('/api/user/:id',   user.show);
app.post('/api/user/',      user.create);
app.put ('/api/user/',      user.update);
<<<<<<< HEAD
app.del ('/api/user/',      user.delete);
=======
app.del ('/api/user/:id',   user.delete);
>>>>>>> api server ready for first launch

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %s in %s mode.",  app.get('port'), app.settings.env);
});
<<<<<<< HEAD
=======

>>>>>>> api server ready for first launch
