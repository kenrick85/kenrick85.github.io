const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async(req,res) => {
   const posts = await loadPostCollection();
   res.send(await posts.find({}).toArray()); 
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        course: req.body.course,
        createdAt: new Date(),
        location: req.body.location,
        price: req.body.price
    });
    res.status(201).send();
});


// Delete Posts
router.delete('/:id', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect ('mongodb+srv://kenrick85:ricknek@cw2-backend-omomz.mongodb.net/test?retryWrites=true&w=majority', { //('mongodb://127.0.0.1:27017', {
         useNewUrlParser: true,
         useUnifiedTopology: true
     });
     return client.db('cw2-backend').collection('posts');
 }

// testing testing


module.exports = router;