/*------------------------------------------
// COMMENTS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const commentModel = require("../models/Comment");

router.get("/comments/:type/:id", async (req, res) => {
  try {
    const comments = await commentModel
      .find({
        [req.params.type]: req.params.id
      })
      .populate("author");
    res.status(200).json({ comments });
  } catch(dbErr) {
    res.status(500).json(dbErr);
  }
});

router.post("/comments/:type/:id", async (req, res) => {
  const newComment = {
    message: req.body.message,
    author: req.user._id,
    date: Date.now()
  };

  newComment[req.params.type] = req.params.id;

  try {
    const c = await commentModel.create(newComment);
    res.status(200).json({ newComment: c });
  } catch(dbErr) {
    res.status(500).json(dbErr);
  }
});

module.exports = router;
