/*------------------------------------------
// SEARCH ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const artistModel = require("../models/Artist");
const albumModel = require("../models/Album");

router.get("/search", async (req, res, next) => {
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

  Promise.all([artistSearch, albumSearch])
    .then(dbRes => res.json({ artists: dbRes[0], albums: dbRes[1] }))
    .catch(next);
});

module.exports = router;
