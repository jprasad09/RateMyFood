const express = require("express");
const router = express.Router();
const Like = require("../models/likeModel");
const Dislike = require("../models/dislikeModel");

router.post("/getLikes", (req, res) => {
  let variable = {};
  if (req.body.review_id) {
    variable = { review_id: req.body.review_id };
  } else {
    variable = { comment_id: req.body.comment_id };
  }

  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

router.post("/getDislikes", (req, res) => {
  let variable = {};
  if (req.body.review_id) {
    variable = { review_id: req.body.review_id };
  } else {
    variable = { comment_id: req.body.comment_id };
  }

  Dislike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});

router.post("/upLike", (req, res) => {
  let variable = {};
  if (req.body.review_id) {
    variable = { review_id: req.body.review_id, user_id: req.body.user_id };
  } else {
    variable = { comment_id: req.body.comment_id, user_id: req.body.user_id };
  }

  const like = new Like(variable);
  //save the like information data in MongoDB
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });
    //In case disLike Button is already clicked, we need to decrease the dislike by 1
    Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post("/unLike", (req, res) => {
  let variable = {};
  if (req.body.review_id) {
    variable = { review_id: req.body.review_id, user_id: req.body.user_id };
  } else {
    variable = { comment_id: req.body.comment_id, user_id: req.body.user_id };
  }

  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/unDisLike", (req, res) => {
  let variable = {};
  if (req.body.review_id) {
    variable = { review_id: req.body.review_id, user_id: req.body.user_id };
  } else {
    variable = { comment_id: req.body.comment_id, user_id: req.body.user_id };
  }

  Dislike.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/upDisLike", (req, res) => {
  let variable = {};
  if (req.body.review_id) {
    variable = { review_id: req.body.review_id, user_id: req.body.user_id };
  } else {
    variable = { comment_id: req.body.comment_id, user_id: req.body.user_id };
  }

  const disLike = new Dislike(variable);
  //save the like information data in MongoDB
  disLike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });
    //In case Like Button is already clicked, we need to decrease the like by 1
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

module.exports = router;
