/*------------------------------------------
// USERS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

router.get("/users", async (req, res, next) => {
  try {
    res.json({ users: await userModel.find() });
  } catch (dbErr) {
    next(dbErr);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    res.json(await (await userModel.findById(req.params.id)).populated("favorites.artists").populate("favorites.albums"));
  } catch (dbErr) {
    next(dbErr);
  }
});

router.get("/users/:id/favorites/:resourceType", async (req, res, next) => {
  userModel.findById(req.params.id, { favorites: 1 })
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next)
});

router.patch("/users/favorites/:resourceType/:id", async (req, res, next) => {
  const what = `favorites.${req.params.resourceType}`;
  const q = {
    _id: req.user._id,
    [what]: req.params.id
  };

  try {
    var dbRes;
    const favoritesMatched = await userModel.find(q);

    if (!favoritesMatched.length)
      dbRes = await userModel.findByIdAndUpdate(req.user._id, { $push: { [what]: req.params.id } }, { new: true })
    else
      dbRes = await userModel.findByIdAndUpdate(req.user._id, { $pull: { [what]: req.params.id } }, { new: true })

    res.status(200).json({ dbRes, isFavorite: !favoritesMatched.length });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
