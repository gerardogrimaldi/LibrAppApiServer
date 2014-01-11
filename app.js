var express   = require('express');
var routes    = require('./routes');
var user 	  = require('./routes/user/user.js');
var http 	  = require('http');
var path 	  = require('path');
var mongoose  = require('mongoose');

mongoose.connect('mongodb://librapp:%#L1br4pp#%@ds047198.mongolab.com:47198/librapp');
var app = express();

// CORS header securiy
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

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

/*app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());*/

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/api', routes.index);
app.get('/api/users', user.index);
app.get('/api/user/:id', user.show);
app.post('/api/user/create', function(req, res){
  var hola = req;
  res.send('hello world');
});

//user.create);
app.put('/api/user/update', user.update);
app.del('/api/user/delete', user.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//http://www.codemag.com/Article/1210041