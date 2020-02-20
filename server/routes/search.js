/*------------------------------------------
// SEARCH ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const artistModel = require("../models/Artist");
const albumModel = require("../models/Album");

router.get("/search", async (req, res) => {
  console.log(req.query);
  const regExp = new RegExp(req.query.q, "i");

  const artistSearch = artistModel.find({
    name: regExp
  });

  const albumSearch = albumModel
    .find({
      title: regExp
    })
    .populate({
      path: "artist",
      match: { name: regExp }
    });

  try {
    const dbRes = await Promise.all([artistSearch, albumSearch]);
    // console.log(dbRes);

    res.json({ artists: dbRes[0], albums: dbRes[1] });
  } catch (dbErr) {
    console.log(dbErr);
    res.status(500).end();
  }
});

module.exports = router;
