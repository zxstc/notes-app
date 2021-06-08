
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
const loginController = require('../controller/login.controller');


// LOGIN USER 
module.exports = (app) => {
    app.post('/login', loginController.login);
}