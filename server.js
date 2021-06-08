//Importing Module Express.js for creating the server and all the set of requests and responses

const express = require("express");

// Importing Module body Parasr -> used for parsing the data
// const bodyParser = require("body-parser");

const cors = require('cors');



// configurate the database
//const dbConfig = require("./config/database.config.js");
// const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
const dotenv = require('dotenv');


const PORT = process.env.PORT || 3000;

//Accessing Environment Variables
dotenv.config();
mongoose.Promise = global.Promise;
// connecting to the database
// mongoose.connect(dbConfig.url, {
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log("successfully connect to the database.");
}).catch((err)=>{
    console.log(" can not connect to the database. ", err);
    process.exit();
});

//

// Create express app
const app = express();


// Parse requests of content-type -application/ x-www-form-urlencoded
// app.use() which helps me to use other set of dependencies into express app
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

// Parse requests of content-type application/json
//app.use(bodyParser.json());
app.use(express.json(), cors());



// Requiring note routes
require('./app/routes/note.routes')(app);
require('./app/routes/auth.routes')(app);


// Define a simple route
app.get('/', (req, res) => {
    res.json({"message": "this is a response from server.js emmmmmm, interesting"});
});


app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});

