/*------------------------------------------
// USERS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

router.get("/users", async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.json({ users: users });
  } catch (err) {
    next(err);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/users/:id/favorites", async (req, res, next) => {
  try {
    const dbRes = await userModel
      .findById(req.params.id)
      .populate("favorites.artists")
      .populate({
        path: "favorites.albums" // here the associated artist document will be fetched as well
      })
      .populate({
        path: "artist.$"
      });
    // .populate("favorites.albums")
    // .populate("favorites.labels")
    // .populate("favorites.styles");
    res.status(200).json(dbRes.favorites);
  } catch (err) {
    next(err);
  }
});

router.patch("/users/favorites/:resourceType/:id", async (req, res, next) => {
  try {
    let dbRes = null;
    const target = `favorites.${req.params.resourceType}`;
    const currentUserID = req.user._id;

    // look if the user already liked this resource
    const alreadyInFav = await userModel.findOne({
      _id: currentUserID,
      [target]: req.params.id
    });

    // if not found
    if (!alreadyInFav) {
      // push id in favorites
      dbRes = await userModel.findByIdAndUpdate(
        currentUserID,
        { $push: { [target]: req.params.id } },
        { new: true }
      );
    } else {
      // pull id from favorites
      dbRes = await userModel.findByIdAndUpdate(
        currentUserID,
        { $pull: { [target]: req.params.id } },
        { new: true }
      );
    }
    // console.log(dbRes);
    res.status(200).json({
      dbRes,
      // line below works as a toggle boolean usefull for the client
      isFavorite: dbRes.favorites[req.params.resourceType].includes(
        req.params.id
      )
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
