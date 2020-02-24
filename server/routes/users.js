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
    res.json(await userModel.findById(req.params.id));
  } catch (dbErr) {
    next(dbErr);
  }
});

router.get("/users/:id/favorites", async (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.patch("/users/favorites/:resourceType/:id", async (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

module.exports = router;
