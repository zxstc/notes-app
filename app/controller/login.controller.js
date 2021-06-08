const Joi = require('@hapi/joi');
const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// VALIDATION SCHEMA
const loginSchema = Joi.object({
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(6)
});

//LOGIN USER
exports.login = async (req, res) => {

    //CHECKING IF USER EXISTS
    const user = await UserModel.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send({ message: "incorrect email id." });

    //CHECKING IF USER PASSWORD IS VALID OR NOT
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ message: "password is incorrect." });


    try {
        //VALIDATION OF USER INPUTS 
        const { err } = await loginSchema.validateAsync(req.body);
        if (err) return res.status(400).send(err.details[0].message);
        else {  
            //GENERATING JWT TOKEN
            const token = jwt.sign({
                _id: user._id
            }, process.env.TOKEN_SECRET);
            res.header("auth-token", token).send({
                message: "successfully login",
                token: token
            });
        }

    } catch (error) {
        res.status(500).send(error);
    }
}
