let User = require('../models/users').User;
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

function CheckHashed(pass, hashed){
    bcrypt.compare(pass, hashed).then(function(match) {
        if (match){
            return true
        }else{
            return false
        }      
    });
}

//create a route to check whether the user already exist in the DB

router.post('/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email});
    let dbPw = user[0].password;
    if (user.length>0){
        let isAuthenticated = bcrypt.compareSync(password, dbPw);
        if (isAuthenticated){
            let token = auth.generateToken(user[0]);
            resp.cookie('auth_token', token);
            resp.send({
                _redirectURL: '/admin',
                get redirectURL() {
                    return this._redirectURL;
                },
                set redirectURL(value) {
                    this._redirectURL = value;
                },
            });
        }else{
            resp.status(400);
        }
    }else{
        resp.status(400);

    }
        

 
    // if (user.length == 0){
    //     resp.send("rejected")
    // }
    // let dbPassword = user[0].password;
    // let res = await bcrypt.compare(password, user[0].password);
    // console.log (res);
    // let token = auth.generateToken(user[0]);
    // console.log(token);
    // resp.cookie('auth_token', token)
    // resp.send("logged");

  
    

});

//     }
//     if (user.length > 0){
//         let comparisonResult = await bcrypt.compare(password, user[0].password);
//         if(comparisonResult) {
//             let token = auth.generateToken(user[0]);
//             console.log(token);
//             resp.cookie('auth_token', token);
//             resp.send("loggedin")
//         }else {
//             resp.send("rejected");
//         }
//     }else{
//         resp.send("rejected")
//     }
   
// })



 // if(comparisonResult) {
       
        //     console.log("logged");
        // } else {
        //     res.send('Rejected');
        //     console.log("rejected");
        // }
// router.post('/login', async (req, resp)=>{
//     let email = req.body.email;
//     let password = req.body.password;
//     let user = await User.find().where({email: email});
//     if (user.length > 0) {
//         let comparisonResult = await bcrypt.compare(password, user[0].password);
//         if (comparisonResult){
//         // if password is correct we need to generate a token and send it to the user
//         // let token = auth.generateToken(user[0]);
//         // console.log(token);
//         // we send the token to be stored in teh coockie file in the browser
//             // resp.cookie('auth_token', token);
//             resp.send('loggedIn');
//             console.log('loggedIn')
//         }else{
//             resp.send('rejected')
//         }
        
//     }else{
//         resp.send('rejected')
//     }
// })

router.post('/register', async (req, resp)=>{
    // get email an password from form
    let email = req.body.email;
    let password = req.body.password;
    // check if email exist
    let user = await User.find().where({email: email});
    // if not register
    if (user.length == 0) {
        var encryptedPassword = await bcrypt.hash(password, 12);
        let newUser = new User({
            email: email,
            password: encryptedPassword
        })
        await newUser.save();
        resp.send('Done');
        console.log('done');
    }else{
        resp.send('rejected')
    }
})

module.exports = router;