
const mongoose = require('mongoose');
// define a simple schema for a note app
const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, { timestamps: true });
module.exports = mongoose.model("Note",NoteSchema);
