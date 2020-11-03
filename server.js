var express = require("express");


var app = express();
var PORT = process.env.PORT || 3500; 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname)); 

//require('./routes/routes')(app); 
require('./routes/htmlRoutes')(app); 

app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});