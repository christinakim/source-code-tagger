var request = require("request");
var cheerio = require("cheerio");
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	var url = "http://www.christinakim.me/";
    request(url, function(error, response, html){
        if(!error){
        	var $ = cheerio.load(html),
            	//returns all elements between html tags as nodes  
            	data = $("html *");
        }
        console.log(data);
    })

});

var server = app.listen(5000, function () {
	var host = server.address().address;
  	var port = server.address().port;

  console.log('Slack Exercise listening at http://%s:%s', host, port);
});