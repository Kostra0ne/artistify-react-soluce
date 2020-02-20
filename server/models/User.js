const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "editor", "user"],
    default: "user"
  },
  username: {
    type: String,
    default: "anonym"
  },
  favorites: {
    artists: [{
      type: Schema.Types.ObjectId,
      ref: "Artist"
    }],
    albums: [{
      type: Schema.Types.ObjectId,
      ref: "Album"
    }],
    styles: [{
      type: Schema.Types.ObjectId,
      ref: "Style"
    }],
    labels: [{
      type: Schema.Types.ObjectId,
      ref: "Label"
    }],
  },
  avatar: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/svg/img_258083.png"
  } 
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
