
var cluster = require('cluster');

if (cluster.isMaster) {

    var numWorkers = require('os').cpus().length - 1;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });

    console.log(cluster.workers);

} else {

    var express = require('express');
    var port = process.env.PORT || 8080;
    var app = express();

    //WORKER CODE, this code will be executed in a worker thread
    app.get('/', function(request, response) {

      console.log('process ' + process.pid + ' says hello!');
      response.send('process ' + process.pid + ' says hello!');

    }).listen(port, function () {
      console.log('Example app listening on port '+port);
    });

}