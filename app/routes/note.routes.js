const verify = require('../controller/authVerify');

module.exports = (app) => {
    const note = require("../controller/note.controller");    

    // Creating a new note
    app.post('/note',verify, note.create);

    //Retrieving all notes
    app.get('/note', verify,note.findAll);

    //Retrieving a single note based on a note id
    app.get('/note/:noteId', verify,note.findOne);

    // Updating a note with note id
    app.put('/note/:noteId', verify,note.update);

    // Deleting a note with a note id
    app.delete('/note/:noteId', verify,note.delete);
}