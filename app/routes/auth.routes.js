
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
const userController = require('../controller/user.controller');
const loginController = require('../controller/login.controller');



// SIGN UP USER
module.exports = (app) => {
    app.post('/register', userController.create);
}

// LOGIN USER 
module.exports = (app) => {
    app.post('/login', loginController.login);
}