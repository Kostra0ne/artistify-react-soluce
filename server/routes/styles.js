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
    .catch(next);
});

router.get("/styles/:id", (req, res, next) => {
  styleModel
    .findOne({ _id: req.params.id })
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next);
});

router.post("/styles", (req, res, next) => {
  const { name, color, wikiURL } = req.body;

  styleModel
    .create({ name, color, wikiURL })
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next);
});

router.patch("/styles/:id", (req, res, next) => {
  const { name, color, wikiURL } = req.body;

  styleModel
    .findByIdAndUpdate(req.params.id, { name, color, wikiURL })
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next);
});

router.delete("/styles/:id", (req, res, next) => {
  styleModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.json(dbRes))
    .catch(next);
});

module.exports = router;
