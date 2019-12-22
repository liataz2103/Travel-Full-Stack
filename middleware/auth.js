let auth = require('../controllers/auth');
// this function will be added as moddleware to all routes that require admin token
//  if authenticated --> next -(continue), otherwise --> status and message

function checkAuth(req, resp, next) {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        next();
    } else{
        resp.status(400);
        resp.send('Not authorized!');
    }
}

module.exports = checkAuth;