let mongoose = require('mongoose');
//create schema for call bacl request (cbr)
let Schema = mongoose.Schema;
let cbrSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
}); 

//based on schema we create the class - this time since its already the second model we need to add third argument with its name:
let CallbackRequest = mongoose.model('CallbackRequest', cbrSchema, 'callback-requests');

// now we export the class
module.exports = { CallbackRequest };

// now we should connect the class to app.js / rout file