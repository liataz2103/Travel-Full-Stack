let mongoose = require('mongoose');
//create schema for call bacl request (cbr)
let Schema = mongoose.Schema;
let mailSchema = new Schema({
    id: String,
    email: String,
    name: String,
    text: String,
    date: Date
}); 

//based on schema we create the class - this time since its already the second model we need to add third argument with its name:
let Email = mongoose.model('Email', mailSchema, 'emails');

// now we export the class
module.exports = { Email };

// now we should connect the class to app.js / rout file