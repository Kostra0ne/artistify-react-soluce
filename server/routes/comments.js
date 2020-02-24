/*------------------------------------------
// COMMENTS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
// const commentModel = require("../models/Comment");

router.get("/comments/:type/:id", async (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.post("/comments/:type/:id", async (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

module.exports = router;
