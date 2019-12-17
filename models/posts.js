let mongoose = require('mongoose');
//mongoose configuration
let Schema = mongoose.Schema;
let postSchema = new Schema({
    id: Number,
    title: String,
    date: Date,
    description: String,
    text: String,
    Country: String,
    imageURL: String
}); 
let Post = mongoose.model('Post', postSchema);

module.exports = { Post };
