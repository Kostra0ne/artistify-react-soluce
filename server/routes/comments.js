/*------------------------------------------
// COMMENTS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const commentModel = require("../models/Comment");

router.get("/comments/:type/:id", async (req, res, next) => {
  commentModel.find({ [req.params.type]: req.params.id }).sort({date: -1})
    .populate("author")
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next)
});

router.post("/comments/:type/:id", async (req, res, next) => {
  commentModel.create({
    author: req.user._id,
    message: req.body.message,
    [req.params.type]: req.params.id
  })
    .then(async dbRes => {
      const fullComment = await commentModel.populate(dbRes, { path: 'author', model: 'User' });
      res.status(200).json(fullComment)})
    .catch(next)

});

module.exports = router;
