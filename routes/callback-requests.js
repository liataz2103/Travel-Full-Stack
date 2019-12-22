let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let CallbackRequest = require('../models/callback-requests').CallbackRequest;
let authMiddleware = require('../middleware/auth');

// when the page is loaded a get request is sent and the server send request to db to retrieve data
// the middlware chick if the user is authorized if so it calls next (which is the rest pf thr code, otherwise it send message not authorized)
router.get('/', authMiddleware, async (req, resp) => {
    resp.send(await CallbackRequest.find());
});

//receive info and send it to the db, wait for respond and send accepted
router.post('/',  async (req, resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid,
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save()
    resp.send('accepted');
    
});

//get info, send delete request to db , wait for respond and send to server deleted
router.delete('/:id', authMiddleware,  async (req, resp) => {
    await CallbackRequest.deleteOne({_id: req.params.id});
    resp.send('deleted');
});


module.exports = router;