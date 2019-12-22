let uniqid = require('uniqid');
let Post = require('../models/posts').Post;
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

let id = 1

// when the client sends get request to the server the server send request to the db
// the request is asynchronous (we need the code to wait for resposne)
router.get('/', async (req, resp) => {
    let posts = await Post.find();
    // the respond will basically be an array of posts
    resp.send(posts);
});

router.get('/:id', async (req, resp) => {
    let id = req.params.id
    console.log(id)
    let post = await Post.findOne({_id: id});
    console.log(post)
    resp.send(post);
});


//when the server gets a post request from the client (after submitting the form), he routes the request to the db
router.post('/', authMiddleware,   async (req, resp) => {
    let reqBody = req.body;
    let imgPath;
    // if imageURL is not empty (we upload image through url)
    if(reqBody.imageUrl){
        imgPath = reqBody.imageUrl // we set imgpath to the omageURL
    }else{ // if we apload image through file
        let path = req.file.path.indexOf('c') +1
        imgPath = req.file.path.substring((req.file.path.indexOf('c')+1), req.file.path.length);
        console.log(imgPath);
     }
    let newPost = new Post ({
        id: id++,
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
    
    // save the newly added post
    await newPost.save();
  
    // send response 
    resp.send('Created');
});

router.delete('/:id', authMiddleware,  async(req, resp) =>{
    let id = req.params.id;
    console.log(id);
    await Post.deleteOne({_id: id});
    resp.send ('deleted!');
})

router.put('/:id', authMiddleware,  async (req, resp) => {
    let id = req.params.id
    let post = await Post.updateOne({_id: id}, req.body);
    resp.send('updated!');
});

module.exports = router;

