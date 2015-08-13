var rest = require('restler');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var Client = require('node-rest-client').Client;


var options_proxy={
        proxy:{
            host:"sacproxy.verizon.com",
            port:80
        }
    },

client = new Client(options_proxy);

// direct way



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
  console.log('req.query', req.query);

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

app.get('/client-rest', function(req, res) {
  console.log('req.query', req.query);

  client.get(req.query.url || "http://www.google.com", function(data, response) {
    // parsed response body as js object
    //console.log(data);
    // raw response
    console.log(response);
    res.send(data);
  });
});



app.get('/test', function(req, res) {
  console.log('req.query', req.query);

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


var server = app.listen(4000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
