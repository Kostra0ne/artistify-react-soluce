const models = {
    albums: require("../models/Album"),
    artists: require("../models/Artist")
};

const getAverageRate = async (typeResource, idResource) => {
    // use agregate features @ mongo db to code this feature
    // https://docs.mongodb.com/manual/aggregation/
    const avg = await models[typeResource].aggregate([
        { $unwind: "$rates" },
        { $match: { _id: idResource } },
        {
            $group: {
                _id: "$_id",
                avgRate: { $avg: "$rates.rate" }
            }
        }
    ]);

    return avg.length ? avg[0].avgRate : 0;
};

module.exports = getAverageRate;