var cheerio = require("cheerio"),
	express = require('express'),
	request = require("request"),
	bodyParser = require("body-parser"),
	app = express();

app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'jade');
app.use(require('./controllers'));
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(3000, function () {
	var host = server.address().address;
  	var port = server.address().port;

  console.log('Slack Exercise listening at http://%s:%s', host, port);
});