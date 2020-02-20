/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../models/Artist");
const albumModel = require("../models/Album");

const getAverageRate = async idArtist => {
  const avg = await artistModel.aggregate([
    { $unwind: "$rates" },
    { $match: { _id: idArtist } },
    {
      $group: {
        _id: "$_id",
        avgRate: { $avg: "$rates.rate" }
      }
    }
  ]);

  return avg.length ? avg[0].avgRate : 0;
};

router.get("/artists", async (req, res) => {
  // let's determine the sort query object ()
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  // console.log("sort and limit artists ? > ", sortQ, limitQ);
  artistModel
    .find({})
    .populate("style")
    .sort(sortQ)
    .limit(limitQ)
    .then(async artists => {
      const artistsWithRatesAVG = await Promise.all(
        artists.map(async res => {
          // things are getting tricky here ! :)
          // the following map is async, updating each artist with an avg rate
          const copy = res.toJSON(); // copy the artist object (mongoose response are immutable)
          copy.avg = await getAverageRate(res._id); // get the average rates fr this artist
          copy.isFavorite =
            req.user && req.user.favorites.artists.includes(copy._id);
          return copy; // return to the mapped result array
        })
      );

      res.json({ artists: artistsWithRatesAVG }); // send the augmented result back to client
    })
    .catch(dbErr => res.status(500).json(dbErr));
});

router.get("/artists/:id", (req, res) => {
  const artist = artistModel.findOne({ _id: req.params.id }).populate("style");
  const albums = albumModel.find({ artist: req.params.id });
  const userRate = artistModel.findOne(
    { "rates.author": req.user._id },
    { "rates.author.$": 1 }
  );

  Promise.all([artist, albums, userRate])
    .then(async dbRes => {
      const artistWithRatesAVG = dbRes[0].toJSON(); // copy the artist object (mongoose response are immutable)
      artistWithRatesAVG.avg = await getAverageRate(artistWithRatesAVG._id); // get the average rates fr this artist

      res.send({
        // send the gathered results back to client
        artist: artistWithRatesAVG,
        albums: dbRes[1],
        userRate: dbRes[2]
      });
    })
    .catch(dbErr => res.status(500).json(dbErr));
});

router.get("/filtered-artists", (req, res) => {
  const q = req.query.band === "true" ? { isBand: true } : {};
  artistModel
    .find(q)
    .then(dbRes => res.json(dbRes))
    .catch(dbErr => res.json(dbErr));
});

router.post("/artists", (req, res) => {
  const newArtist = {
    name: req.body.name,
    isBand: Boolean(Number(req.body.isBand)),
    description: req.body.description
  };

  if (req.body.style) newArtist.style = req.body.style;

  artistModel
    .create(newArtist)
    .then(dbRes => {
      res.json(dbRes);
    })
    .catch(dbErr => res.status(500).send(dbErr));
});

router.patch("/artists/:id", async (req, res) => {
  const updatedArtist = {
    name: req.body.name,
    description: req.body.description,
    isBand: req.body.isBand
  };

  if (req.body.style) updatedArtist.style = req.body.style;

  artistModel
    .findByIdAndUpdate(req.params.id, updatedArtist)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => res.status(500).json(dbErr));
});

router.delete("/artists/:id", (req, res) => {
  artistModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

module.exports = router;
