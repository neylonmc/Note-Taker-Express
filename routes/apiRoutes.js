const fs = require("fs"); 
var uuid = require("uuid"); 

// Routing
module.exports = function(app) {

    // GET request
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", (err, data) => {
        var noteParsed = JSON.parse(data);
        res.json(noteParsed)
    });
  });

  // POST request
  app.post("/api/notes", function (req, res) {
    let noteId = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }

    fs.readFile("./db/db.json", (err, data) => {
        var noteParsed = JSON.parse(data);
        noteParsed.push(noteId); 
        fs.writeFile("./db/db.json", JSON.stringify(noteParsed), function (err, post) {
            if (err) throw err; 
        });
    });
    //res.send("Updated notes");
    res.send();
    console.log("You have updated your notes.");
});

 
  // DELETE request
  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("./db/db.json", (err, data) => {
        var noteParsed = JSON.parse(data);
        var newNote = noteParsed.filter(note => note.id !== req.params.id); 
        fs.writeFile("./db/db.json", JSON.stringify(newNote), function(err, post) {
            if (err) throw err; 
        });
    });
    res.send(); 
    console.log("You have deleted a note.");

});
};