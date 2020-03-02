/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../models/Artist");
const albumModel = require("../models/Album");


router.get("/artists", async (req, res, next) => {
  // let's determine the sort query object ()
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  artistModel
    // fetch all documents from artists collection
    .find({})
    // populate "joins" uses provided objectId to reference an object from an other collection
    .populate("style")
    .sort(sortQ) // the provided sort query comes into action here
    .limit(limitQ) // same thing for the limit query
    .then(async artists => {
      const artistsWithIsFavorite = await Promise.all(
        artists.map(async res => {
          // let's create a clone of each document since they are read-only by default
          const copy = res.toJSON(); // copy the artist object (mongoose response are immutable)
          copy.isFavorite =
            req.user && req.user.favorites.artists.includes(copy._id.toString());
          return copy; // return to the mapped result array
        })
      );

      res.json({ artists: artistsWithIsFavorite }); // send the augmented result back to client
    })
    .catch(next);
});

router.get("/artists/:id", async (req, res, next) => {
  try {
    const artist = await artistModel.findById(req.params.id).populate("style");
    const albums = await albumModel.find({ artist: req.params.id });
    res.status(200).send({
      artist,
      albums
    })
  } catch (err) {
    next(err);
  }

});


router.post("/artists", (req, res, next) => {
  artistModel.create(req.body)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next)
});

router.patch("/artists/:id", async (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.delete("/artists/:id", (req, res, next) => {
  artistModel.findByIdAndDelete(req.params.id)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next)
});

module.exports = router;
