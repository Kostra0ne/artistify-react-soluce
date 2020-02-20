const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    style: {
      type: Schema.Types.ObjectId,
      ref: "Style"
    },
    description: String,
    isBand: Boolean,
    rates: [
      {
        rate: Number,
        author: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        date: {
          type: Date,
          default: Date.now()
        }
      }
    ]
  },
  { timestamps: true }
);

const artistModel = mongoose.model("Artist", artistSchema);

module.exports = artistModel;
