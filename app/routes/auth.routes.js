
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
const userController = require('../controller/user.controller');



// SIGN UP USER
module.exports = (app) => {
    app.post('/register', userController.create);
}
