const fs = require("fs"); 
var notes = require("../db/db.json");
var uuid = require("uuid"); 

// Routing
module.exports = function(app) {

  // GET request
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  // POST request
  app.post("/api/notes", function (req, res) {
    let noteId = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    }

    fs.readFile("./db/db.json" , (err, data) => {
        var parsedNote = JSON.parse(data);
        parsedNote.push(noteId);
        fs.writeFile("./db/db.json", JSON.stringify(parsedNote), function (err, result) {
            if (err) throw err; 
        });
    });
    res.send("Updated notes"); 
  });
  
  // DELETE request
  app.delete("/api/notes:id", function (req, res) {
        
    fs.readFile("./db/db.json", "utf8", (err,data) => {
       
        const allNotes = JSON.parse(data);
        const newAllNotes = allNotes.filter(note => note.id != req.params.id);

        fs.writeFile('./db/db.json', JSON.stringify(newAllNotes), err => {
            if (err) throw err;
            res.send(notes);
            console.log("Your note has been deleted.");
        });
    });
  });


};