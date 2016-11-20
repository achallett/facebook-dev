var express = require('express');
var app = express();
var request = require("request"); /// new

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
    res.sendfile('./index.html');
});

app.post('/api/facebook', function (req, res) {
    if(req.query.type=='authKey' && req.query.token!=undefined){
        request(constructGetURL(req.query.token), function(error, response, body) {
            console.log(body);

            res.send(JSON.parse(body));
        });


    }

})

app.listen(port, function () {
    console.log('Example app listening on port '+port);
});

app.use(express.static('public'));


function constructGetURL(authToken){
    var getURL = 'https://graph.facebook.com/me?';
    getURL += 'access_token='+authToken;
    getURL += '&fields=first_name,last_name,email';
    console.log(getURL);

    return getURL;
}



