/*------------------------------------------
// STYLES ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();
const styleModel = require("../models/Style");

// BACKEND ROUTES

router.get("/styles", (req, res, next) => {
  styleModel
    .find()
    .then(dbRes => res.status(200).json({ styles: dbRes }))
    .catch(dbErr => next(dbErr));
});

router.get("/styles/:id", (req, res, next) => {
  styleModel
    .findOne({ _id: req.params.id })
    // .then(dbRes => res.json(dbRes))
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => next(dbErr));
});

router.post("/styles", (req, res, next) => {
  const newStyle = {
    name: req.body.name,
    color: req.body.color,
    wikiURL: req.body.wikiURL
  };

  styleModel
    .create(newStyle)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => next(dbErr));
});

router.patch("/styles/:id", (req, res, next) => {
  const updatedStyle = {
    name: req.body.name,
    color: req.body.color,
    wikiURL: req.body.wikiURL
  };

  styleModel
    .findByIdAndUpdate(req.params.id, updatedStyle)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => next(dbErr));
});

router.delete("/styles/:id", (req, res, next) => {
  styleModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => {
      res.json(dbRes);
    })
    .catch(dbErr => next(dbErr));
});

module.exports = router;
