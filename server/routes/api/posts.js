const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//get post
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());

});

//ADD POST
router.post('/', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        course: req.body.course,
        createdAt: new Date()
        
    });
    res.status(201).send();
});


//DELETE POST
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id:new mongodb.ObjectID (req.params.id)});
    res.status(200).send();
});


async function loadPostsCollection() {
   const client = await mongodb.MongoClient.connect ('mongodb+srv://kenrick85:ricknek@cw2-backend-omomz.mongodb.net/test?retryWrites=true&w=majority', { //('mongodb://127.0.0.1:27017', {
    //('mongodb+srv://kenrick85:ricknek@cw2-backend-omomz.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('cw2-backend').collection('posts');
}

module.exports = router;