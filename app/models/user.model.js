const mongoose = require('mongoose');
// define a simple schema for a note app
const UserSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 18
    },
    date: {
        type: Date,
        default: Date.now()
    },
});
module.exports = mongoose.model("Users",UserSchema);