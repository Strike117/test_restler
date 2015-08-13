var rest = require('restler');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});




// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
	console.log('req.query',req.query);
	
  rest.get(req.query.url || 'http://www.google.com').on('complete', function(result) {
    if (result instanceof Error) {
      //console.log('Error:', result.message);
      //this.retry(5000); // try again after 5 sec
    } else {
      //console.log(result);
    }
    res.send(result);
  });
});

app.get('/test', function(req, res) {
	console.log('req.query',req.query);
	
  rest.get(req.query.url || 'http://www.google.com').on('complete', function(result) {
    if (result instanceof Error) {
      //console.log('Error:', result.message);
      //this.retry(5000); // try again after 5 sec
    } else {
      //console.log(result);
    }
    res.send(result);
  });
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});