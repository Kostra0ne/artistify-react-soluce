const mongoose = require("mongoose");

const models = {
    albums: require("../models/Album"),
    artists: require("../models/Artist")
};

const getAverageRate = async (typeResource, idResource) => {
    const id = typeof idResource === "string" ? mongoose.Types.ObjectId(idResource) : idResource;
    const avg = await models[typeResource].aggregate([
        { $match: { _id: id } },
        { $unwind: "$rates" },
        {
            $group: {
                _id: "$rates.author",
                rate: { $avg: "$rates.rate" }
            },

        }
    ])

    return avg.length ? avg[0].rate : 0;
};


module.exports = getAverageRate;