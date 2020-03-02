const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  message: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  },
  artists: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
  },
  albums: {
    type: Schema.Types.ObjectId,
    ref: "Album",
  },
  labels: {
    type: Schema.Types.ObjectId,
    ref: "Label",
  },
  styles: {
    type: Schema.Types.ObjectId,
    ref: "Style",
  }
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
