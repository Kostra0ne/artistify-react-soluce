/*------------------------------------------
// RATES ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();

const models = {
  albums: require("../models/Album"),
  artists: require("../models/Artist")
};

router.get("/rates/:resourceType/:rId/users/:uId", async (req, res) => {
  try {
    const dbRes = await models[req.params.resourceType].findById(
      req.params.rId,
      {
        rates: { $elemMatch: { author: req.params.uId } }
      }
    );
    console.log("---Oô----");
    const userRate = dbRes.rates.length ? dbRes.rates[0].rate : null
    // console.log(dbRes.rates[0]);
    console.log(userRate);
    
    res.status(200).send({userRate});
  } catch (dbErr) {
    res.status(500).send(dbErr);
  }
});

router.patch("/rates/:resourceType/:id", async (req, res) => {
  const currentModel = models[req.params.resourceType];

  if (!currentModel)
    return res
      .status(500)
      .json("inavlid resource type, check the rates router");

  const currentUserId = req.user._id;
  const { rate } = req.body;

  try {
    // try to find the previous rate, if nay
    const dbRes = await currentModel.findOneAndUpdate(
      { _id: req.params.id, "rates.author": currentUserId },
      { $set: { "rates.$": { rate: req.body.rate, author: currentUserId } } },
      { new: true }
    );

    if (dbRes) return res.status(200).json(dbRes);

    if (!dbRes) {
      console.log("no rate for this resource yet");
      // the user has not rate this album yet
      const dbRes2 = await currentModel.findByIdAndUpdate(req.params.id, {
        $push: { rates: { rate, author: currentUserId } }
      });
      res.status(200).json(dbRes2);
    }

    // done !
  } catch (dbErr) {
    res.status(500).json(dbErr);
  }
});

module.exports = router;
