
var https = require('http');

var host = 'localhost';


function performRequest(endpoint, method, success) {
  
  var options = {
    host: host,
    path: endpoint,
    method: method,
    port: 8080,
    agent:false
  };

  var req = https.request(options, function(res) {
      res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      success(responseString);
    });
  });

  req.write('');
  req.end();
}


//Calling 1000 times our endpoint
for(var i = 0; i <= 1000; i++){
  performRequest('/', 'GET', function(resp){
    console.log(resp);
  });
}