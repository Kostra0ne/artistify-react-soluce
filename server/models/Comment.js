const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  message: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  category: {
    type: String,
    enum: ["artist", "album", "labels", "styles"]
  },
  date: Date,
  likes: {
    type: Number,
    default: 0
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    default: null
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    default: null
  },
  label: {
    type: Schema.Types.ObjectId,
    ref: "Label",
    default: null
  },
  style: {
    type: Schema.Types.ObjectId,
    ref: "Style",
    default: null
  }
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
