const UserModel = require("../models/user.model");
const bcrypt = require('bcryptjs');

// VALIDATIONS OF USER INPUTS PREREQUISITES
const Joi = require('@hapi/joi');
const registerSchema = Joi.object({
    fname: Joi.string().min(3).required().max(255),
    lname: Joi.string().min(3).required().max(255),
    email: Joi.string().min(3).required().max(255).email(),
    password: Joi.string().min(3).required().max(18)
});

// SIGN UP  USER
exports.create = async (req, res) => {
    //CHECKING IF USE EMAIL ALREADY EXISTS
    const emailExist = await UserModel.findOne({
        email: req.body.email
    });

    if(emailExist){
        res.status(400).send({
            message: 'email alread exists.'
        });
        return;

    }

    // HASHING THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // PROCESSING OF ADD NEW USER
    const user = new UserModel({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword
    });

    try {
       // VALIDATION OF USER INPUTS
       const {error} = await registerSchema.validateAsync(req.body);

       // VARIFING IF ERROR EXISTS WITH OBJECT DESTRUCTURING
        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }else{
            // SAVE USER
            const saveUser = await user.save();
            res.status(200).send({
                message: 'user created successfully.'
            });
        }
    } catch (error) {
        res.status(500).send(error); 
    }


}

/*
return {
    error:{
        details: [{
            message: "Erorr Message on what happened"
        }, "1"]
    },
    success:"mult"
}
*/
/*
//deconstructing
const array1= [1,2,3,4,5]
console.log(array1[3])

var [x,y,z,l,m] = array1

console.log(l)

const obj1 ={
    name:"arjun",
    error: "something"
}

const {error} = obj1;
console.log(error);
*/