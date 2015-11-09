var express = require('express');
var app = express();

var server = app.listen(5000, function () {
	var host = server.address().address;
  	var port = server.address().port;

  console.log('Slack Exercise listening at http://%s:%s', host, port);
});