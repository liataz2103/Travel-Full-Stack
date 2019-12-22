// creating file stracture
// creating package.json file (npm init)
//  creating local server (npm install express), require express and initiate app
let express = require('express');
let mongoose = require('mongoose');
// let Post = require('./models/posts').Post;
let multer = require('multer'); // libraray that work with binry data instead of JSON
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users');
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth');

// initiate app
let app = express();

app.set('view engine', 'ejs');

//mongodb+srv://vertex:linoad120@travelscluster-lcxan.mongodb.net/travels
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
app.use(cookieParser());
//all static files are stored in public folder
app.use(express.static('public'));

app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter );
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

// whenever get request for /sight is received we find 
//the post by id and render the sight page from views  with the mentioned argument from db
app.get('/sight', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({_id: id});
    resp.render('sight', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        description: post.description
    })
})

//whenever get request to /admin is received we render the admin page from views
// the view page will be rendered only of the user is logged in, otherwise the login page weill be rendered


app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }
    
})

app.get('/login', (req, resp)=>{
    resp.render('login');
})
//starting the server
app.listen(3000, ()=> console.log('listening 3000...'));

