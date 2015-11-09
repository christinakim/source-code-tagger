var request = require("request");
var cheerio = require("cheerio");
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	var url = "http://www.christinakim.me/";
    request(url, function(error, response, html){
        if(!error){
        	var name, 
        		//obj where key = tag, val = tag count
        		tags = {},
        		$ = cheerio.load(html),
            	//returns all elements between html tags as nodes  
            	data = $("html *");

			//traverse DOM to get name of each node/element
            for (i = 0; i < data.length; i++) { 
    			tag = data.get(i).name;

    			//if it's the first time we're seeing the tag add it to tags and set the count to 1
    			if(tags[tag] === undefined){
    				tags[tag] = 1;
    			} else {
    				//otherwise add 1 
    				tags[tag] = tags[tag] + 1;
    			}
			}

        }
        console.log(data.length);

        res.send(tags);
    })

});

var server = app.listen(5000, function () {
	var host = server.address().address;
  	var port = server.address().port;

  console.log('Slack Exercise listening at http://%s:%s', host, port);
});