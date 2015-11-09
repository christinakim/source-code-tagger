var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('index')
});

router.post('/summary', function (req, res) {
	var url = req.body.url;
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

        var summary = document.getElementById('summary');
        var sourceCode = document.getElementById('source-code');
        summary.textContent = tags;
        sourceCode.textContent = $(this); 
    })
});

module.exports = router;