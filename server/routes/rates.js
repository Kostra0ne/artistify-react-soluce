/*------------------------------------------
// RATES ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const getAverage = require("../utils/getAverageRate")

const models = {
  albums: require("../models/Album"),
  artists: require("../models/Artist")
};

/**
 * @description Get the average rate for one given resource (album/artist/label/style)
 */
router.get("/rates/:resourceType/:resourceId/", async (req, res, next) => {
  try {
    const avgRate = await getAverage(req.params.resourceType, req.params.resourceId);
    console.log("avgRate");
    console.log(req.params.resourceType, avgRate);
    
    res.status(200).json({avgRate})
  } catch (err) {
    next(err);
  }

});

/**
 * @description Get the rate for one given resource (album/artist/label/style) for one given user
 */
router.get("/rates/:resourceType/:resourceId/users/:userId", async (req, res, next) => {
  models[req.params.resourceType]
    .findById(req.params.resourceId, {
      rates: { $elemMatch: { author: req.params.userId } }
    })
    .then(dbRes => res.status(200).send({ userRate: dbRes.rates[0] ? dbRes.rates[0].rate : 0 }))
    .catch(next);
});

router.patch("/rates/:resourceType/:id", async (req, res, next) => {
  const currentModel = models[req.params.resourceType];

  if (!currentModel) return next();

  const currentUserId = req.user._id;
  const { rate } = req.body;

  try {
    // try to find the previous rate
    const dbRes = await currentModel.findOneAndUpdate(
      { _id: req.params.id, "rates.author": currentUserId },
      { $set: { "rates.$": { rate: req.body.rate, author: currentUserId } } },
      { new: true }
    );

    if (dbRes) return res.status(200).json(dbRes);

    // the user has not rate this resource yet
    const dbRes2 = await currentModel.findByIdAndUpdate(req.params.id, {
      $push: { rates: { rate, author: currentUserId } }
    },
      { new: true }
    );
    res.status(200).json(dbRes2);

    // done !
  } catch (dbErr) {
    next(dbErr);
  }
});

module.exports = router;
