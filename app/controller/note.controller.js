//
const NoteModel = require('../models/note.model');

// creating and saving a note
exports.create = (req, res) => {
    //validate request
    console.log(req.body);
    console.log('------------------------');
    if (!req.body.content) {
        return res.status(400).send({
            message: 'note content can not be empty.'
        });
    }
    //creating a note
    const note = new NoteModel({
        title: req.body.title || "untitled note",
        content: req.body.content
    });

    // saving a note
    note.save().then(data => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "some error occured while creating the note"
        });
    });
};

// Retrieving and returning all notes from the database
exports.findAll = (req, res) => {
    NoteModel.find().then(notes => {
        console.log(notes);
        res.send(notes);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "some error occured while retrieving the note"
        });
    });
};

// Find a single note with a note id
exports.findOne = (req, res) => {
    NoteModel.findById(req.params.noteId).then((note) => {
        //validating the note
        if (!note) {
            res.status(404).send({
                message: 'note not found with id ' + req.params.noteId
            });
        }
        res.send(note);
    }).catch((err) => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: err.message || "some error occured while retirieving note with note id:" + req.params.noteId
            });
        }

        res.status(500).send({
            message: err.message || "some error occured while retirieving note with note id:" + req.params.noteId
        });
    });
};

// Updating a note with a note id
exports.update = (req, res) => {
    //validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: 'note content can not be empty.'
        });
    }

    // finding the note and updating it with the request body
    NoteModel.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "untitled note",
        content: req.body.content
    }, { new: true }).then((note) => {
        //validating the note
        if (!note) {
            res.status(404).send({
                message: 'note not found with id ' + req.params.noteId
            });
        }
        res.send(note);
    }).catch((err) => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: err.message || "some error occured while updating note with note id:" + req.params.noteId
            });
        }

        res.status(500).send({
            message: err.message || "some error occured while updating note with note id:" + req.params.noteId
        });
    })
};

//Delete a note with a note id
exports.delete = (req, res) => {
    NoteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            //Validating the note
            if (!note) return res.status(404).send({ message: ' Note not found with id ' + req.params.noteId })
            res.send(note)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: ' Note not found with id ' + req.params.noteId })
            }
            res.status(500).send({
                message: err.message || 'Some error occured while deleting the note'
            })
        })
}