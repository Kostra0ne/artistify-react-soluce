/*------------------------------------------
// LABELS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const labelModel = require("../models/Label");
const uploader = require("../config/cloudinary");

// BACKEND ROUTES
router.get("/labels", (req, res, next) => {
  labelModel
    .find()
    .then(dbRes => res.json({ labels: dbRes }))
    .catch(dbErr => next(dbErr));
});

router.get("/labels/:id", (req, res, next) => {
  labelModel
    .findOne({ _id: req.params.id }) // this will fetch one album by id from db
    .then(label => res.json(label))
    .catch(dbErr => next(dbErr)); // catched if an error occured );
});

router.post("/labels", uploader.single("logo"), (req, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  const newLabel = req.body;

  if (req.file) newLabel.logo = req.file.secure_url;

  labelModel
    .create(newLabel) // use the model and try doc insertion in database
    .then(() => res.json(newLabel))
    .catch(dbErr => next(dbErr));
});

router.patch("/labels/:id", uploader.single("logo"), async (req, res, next) => {
  const updatedLabel = req.body;
  if (req.file) updatedLabel.logo = req.file.secure_url;
  labelModel
    .findByIdAndUpdate(req.params.id, updatedLabel)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => next(dbErr));
});

router.delete("/labels/:id", (req, res, next) => {
  labelModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.json(dbRes);
    })
    .catch(dbErr => next(dbErr));
});

module.exports = router;
