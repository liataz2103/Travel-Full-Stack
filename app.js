// creating file stracture
// creating package.json file (npm init)
//  creating local server (npm install express), require express and initiate app
let express = require('express');
let mongoose = require('mongoose');
let Post = require('./models/posts').Post;
let multer = require('multer'); // libraray that work with binry data instead of JSON
// let postsRouter = require('./routes/posts');


// initiate app
let app = express();

mongoose.connect('mongodb://localhost/travels', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    });
// use express.json to be able to read the info from the client
app.use(express.json());
// with this variable we tell multer where to store the file and with which name
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'), //cb - call back function that gets 2 arguments - 1 - error case, 2-path
    filename: (req, file, cb) => cb(null, file.originalname) //cb - call back function that gets 2 arguments - 1 - error case, 2-file name
})

app.use(multer({storage: imageStorage}).single('imageFile')); //image file is the key from which we retrieve the data from the data object in the client side
//initiate id

// Whenever a request start with a route path /posts it will be redirected tp the routes folder
// app.use('/posts', postsRouter);


//all static files are stored in public folder
app.use(express.static('public'));

let id = 1;
app.get('/posts', async(req, resp) =>{
    let posts = await Post.find();
    resp.send(posts);
})

app.post('/posts', async (req, resp) =>{
    let reqBody = req.body;
    let newPost = new Post({
        id: id++,
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: reqBody.imageUrl
    })
    await newPost.save()
})
//starting the server
app.listen(3000, ()=> console.log('listening 3000...'));