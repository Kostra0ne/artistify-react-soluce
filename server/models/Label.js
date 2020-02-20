const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const labelSchema = new Schema({
  name: String,
  city: String,
  country: String,
  street: String,
  streetNb: Number,
  logo: {
    type: String,
    default:
      "https://s1.qwant.com/thumbr/0x0/3/c/47fe4a877a815796e4e74607d1d529b44437e34ba4882fdec70e94a8080d5c/noimage.gif?u=http%3A%2F%2Fmoorestown-mall.com%2Fnoimage.gif&q=0&b=1&p=0&a=1"
  }
});

const labelModel = mongoose.model("Label", labelSchema);

module.exports = labelModel;
