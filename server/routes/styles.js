/*------------------------------------------
// STYLES ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();
const styleModel = require("../models/Style");

// BACKEND ROUTES

router.get("/styles", (req, res) => {
  styleModel
    .find()
    // .then(dbRes => res.json(dbRes))
    .then(dbRes => res.status(200).json({ styles: dbRes }))
    .catch(dbErr => res.status(500).json(dbErr));
});

router.get("/styles/:id", (req, res) => {
  styleModel
    .findOne({_id: req.params.id})
    // .then(dbRes => res.json(dbRes))
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.status(500).json(dbErr));
});

router.post("/styles", (req, res) => {
  const newStyle = {
    name: req.body.name,
    color: req.body.color,
    wikiURL: req.body.wikiURL
  };
  console.log(newStyle);

  styleModel
    .create(newStyle)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => res.status(500).json(dbErr));
});

router.patch("/styles/:id", (req, res) => {
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
    .catch(dbErr => res.status(500).json(dbErr));
});

router.delete("/styles/:id", (req, res) => {
  styleModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => {
      res.json(dbRes);
    })
    .catch(dbErr => console.log(dbErr));
});


module.exports = router;
