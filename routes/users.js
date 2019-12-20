let User = require('../models/users').User;
let express = require('express');
let router = express.Router();

//create a route to check whether the user already exist in the DB
router.post('/login', async (req, resp)=>{
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email}).where({password: password});
    if (user.length > 0) {
        resp.send('logged in');
    }else{
        resp.send('rejected')
    }
})

router.post('/register', async (req, resp)=>{
    // get email an password from form
    let email = req.body.email;
    let password = req.body.password;
    // check if email exist
    let user = await User.find().where({email: email});
    // if not register
    if (user.length == 0) {
        let newUser = new User({
            email: email,
            password: password
        })
        await newUser.save();
        resp.send('Done');
    }else{
        resp.send('rejected')
    }
})

module.exports = router;




