let uniqid = require('uniqid');
let Email = require('../models/emails').Email;
let express = require('express');
let router = express.Router();

// when the page is loaded a get request is sent and the server send request to db to retrieve data
router.get('/', async (req, resp) => {
    resp.send(await Email.find());
});

//receive info and send it to the db, wait for respond and send accepted
router.post('/',  async (req, resp) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid,
        email: reqBody.email,
        name: reqBody.name,
        text: reqBody.text,
        date: new Date()
    })

    await newEmail.save()
    resp.send('accepted');
    
});

//get info, send delete request to db , wait for respond and send to server deleted
router.delete('/:id' , async (req, resp) => {
    await Email.deleteOne({_id: req.params.id});
    resp.send('deleted');
});


module.exports = router;

router.delete('/:id', async(req, resp) =>{
    let id = req.params.id;
    await Email.deleteOne({_id: id});
    resp.send ('deleted!');
})

router.put('/:id', async (req, resp) => {
    let id = req.params.id
    let post = await Post.updateOne({_id: id}, req.body);
    resp.send('updated!');
});

module.exports = router;
