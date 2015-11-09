var cheerio = require("cheerio"),
	express = require('express'),
	request = require("request"),
    json = require("json"),
	bodyParser = require("body-parser"),
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'jade');


var server = app.listen(process.env.PORT ||5000, function () {
	var host = server.address().address;
  	var port = server.address().port;

  console.log('Slack Exercise listening at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
    try {
        res.render('index')
    } 
    catch (e) {
            console.log(e);
    }
});

app.post('/summary', function (req, res) {

    var url = String(req.body.inputUrl);
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
    			name = data.get(i).name;

    			//if it's the first time we're seeing the tag add it to tags and set the count to 1
    			if(tags[name] === undefined){
    				tags[name] = 1;
    			} else {
    				//otherwise add 1 
    				tags[name] = tags[name] + 1;
    			}
			}

        }

        
        try {   
        res.render('summary', {tags: tags, html: '<xmp>' + html + '</xmp>'});
        }
        catch (e) {
            console.log(e);
        }

    })
});
