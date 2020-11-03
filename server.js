var express = require("express");
const urlShortener = require('node-url-shortener')
const path = require("path");



var app = express();
var PORT = process.env.PORT || 3500; 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

require('./routes/apiRoutes')(app); 
require('./routes/htmlRoutes')(app); 

app.post('/url', function(req, res) {
    const url = req.body.url;

    urlShortener.short(url, function(err, shortUrl){
        res.send(shortUrl);
    });
});

app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});