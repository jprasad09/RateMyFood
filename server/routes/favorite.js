const express = require('express');
const router = express.Router();
const Favorite = require('../models/favoriteModel')

router.post("/favoriteNumber", (req, res) => {
    Favorite.find({ "restaurant_id": req.body.restaurant_id })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })

});



router.post("/favorited", (req, res) => {

    Favorite.find({ "restaurant_id": req.body.restaurant_id, "user_id": req.body.user_id })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if (subscribe.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, subcribed: result })
        })

});



router.post("/addToFavorite", (req, res) => {

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/removeFromFavorite", (req, res) => {


    Favorite.findOneAndDelete({ restaurant_id: req.body.restaurant_id, user_id: req.body.user_id })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});


router.post("/getFavoredMovie", (req, res) => {

    //Need to find all of the Users that I am subscribing to From Subscriber Collection 
    Favorite.find({ 'user_id': req.body.user_id })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites })
        })
});



module.exports = router;