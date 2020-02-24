/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../models/Artist");
const albumModel = require("../models/Album");

const getAverageRate = async idArtist => {
  // use agregate features @ mongo db to code this feature
  // https://docs.mongodb.com/manual/aggregation/
};

router.get("/artists", async (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.get("/artists/:id", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.get("/filtered-artists", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.post("/artists", (req, res) => {
  res.status(200).json({ msg: "@todo" })
});

router.patch("/artists/:id", async (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.delete("/artists/:id", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

module.exports = router;
