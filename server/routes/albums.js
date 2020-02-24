/*------------------------------------------
// ALBUMS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
// const albumModel = require("../models/Album");
const uploader = require("./../config/cloudinary");

const getAverageRate = async idAlbum => {
  // use agregate features @ mongo db to code this feature
  // https://docs.mongodb.com/manual/aggregation/
  res.status(200).json({ msg: "@todo" })
};

router.get("/albums", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.get("/albums/:id", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.post("/albums", uploader.single("cover"), (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.patch("/albums/:id", uploader.single("cover"), (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.delete("/albums/:id", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

module.exports = router;
