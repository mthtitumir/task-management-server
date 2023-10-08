const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createErrors = require("http-errors");
const rateLimit = require("express-rate-limit");
const app = express();
const rateLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 5,
    message: "Too many request from this ip, please try again later!",
})
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(rateLimiter);

app.get('/', (req, res)=>{
    res.status(200).send("Welcome to task-wave sever!")
})





module.exports = app;