/*------------------------------------------
// ALBUMS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const albumModel = require("../models/Album");
const uploader = require("./../config/cloudinary");

router.get("/albums", (req, res, next) => {
  // let's determine the sort query either a number or an empty object
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object,
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  albumModel
    .find() // fetch all documents from albums collection
    .populate({
      // populate "joins" uses provided objectId to reference an object from an other collection
      path: "artist", // here the associated artist document will be fetched as well
      populate: {
        // one can nest population
        path: "style" // here the style document asssociated to the artist is fetched as well
      }
    })
    .populate("label") // chaining population is also possible, here for label documents
    .sort(sortQ) // the provided sort query comes into action here
    .limit(limitQ) // same thing for the limit query
    .then(async albums => {
      const albumsWithIsFavorite = await Promise.all(
        albums.map(async album => {
          // let's create a clone of each document since they are read-only by default
          const copy = album.toJSON();
          copy.isFavorite =
            req.user && req.user.favorites.albums.includes(copy._id.toString());
          return copy;
        })
      );

      res.json({ albums: albumsWithIsFavorite }); // send the augmented result back to client
    })
    .catch(next);
});

router.get("/albums/:id", (req, res, next) => {
  albumModel.findById(req.params.id)
    .populate("label")
    .then(album => res.status(200).json(album))
    .catch(next)
});

router.post("/albums", uploader.single("cover"), (req, res, next) => {

  const { title, artist, album, releaseDate } = req.body;

  const newAlbum = {
    title, artist, album, releaseDate
  }

  if (req.file) newAlbum.cover = req.file.secure_url;

  console.log(newAlbum);

  albumModel.create(newAlbum)
    .then(album => res.status(201).json(album))
    .catch(next)
});

router.patch("/albums/:id", uploader.single("cover"), (req, res, next) => {
  // const { title, artist, album, releaseDate } = req.body;

  // const updatedAlbum = {
  //   title, artist, album, releaseDate
  // }

  // if (req.file) updatedAlbum.cover = req.file.secure_url;

  // console.log(updatedAlbum);

  albumModel.findByIdAndUpdate(req.params.id, req.body)
    .then(album => res.status(201).json(album))
    .catch(next)
});

router.delete("/albums/:id", (req, res, next) => {
  albumModel.findOneAndDelete({ _id: req.params.id })
    .then(album => res.status(200).json(album))
    .catch(next)
});

module.exports = router;
