let uniqid = require('uniqid');
let Post = require('../models/posts').Post;
let express = require('express');
let router = express.Router();

let id = 1

// when the client sends get request to the server the server send request to the db
// the request is asynchronous (we need the code to wait for resposne)
router.get('/', async (req, resp) => {
    let posts = await Post.find();
    // the respond will basically be an array of posts
    resp.send(posts);
});

//when the server gets a post request from the client (after submitting the form), he routes the request to the db
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    // let imgPath;
    // if(reqBody.imageURL){
    //     imgPath = reqBody.imageURL
    // }else{
    //     imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);
    // }
    let newPost = new Post ({
        id: id++,
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: reqBody.imageUrl
    })
    
    // save the newly added post
    await newPost.save();
  
    // send response 
    resp.send('Created');
});

router.delete('/:id', async(req, resp) =>{
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send ('deleted!');
})

module.exports = router;

