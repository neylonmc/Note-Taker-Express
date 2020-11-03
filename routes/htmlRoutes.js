const path = require('path');

module.exports = function(app) {

    app.get('/notes', (req,res) => {
        res.sendFile(path.join(__dirname, "/../public/notes.html"));
    });

//Display Index HTML when requested or no other routes can be found 
    app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
    });

}