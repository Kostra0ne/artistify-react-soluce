require("dotenv").config(); // import all key/value pairs from .env in process.env : really usefull when going online :)
require("./../config/mongo");

const albumModel = require("./../models/Album");
const artistModel = require("./../models/Artist");
const LabelModel = require("./../models/Label");
const styleModel = require("./../models/Style");

async function seedIt() {

  try {

    const style = {
      name: "default",
      color: "#10ADED",
      wikiURL: ""
    };

    const styleSeed = await styleModel.create(style);

    const label =
    {
      logo: "https://s2.qwant.com/thumbr/0x0/6/a/f2b4b44327de1f74f7e6b5075f1ab07547edd89857d33ec0265a4fff72a6bc/default-album-artwork.png?u=http%3A%2F%2Fbobjames.com%2Fwp-content%2Fthemes%2Fsoundcheck%2Fimages%2Fdefault-album-artwork.png&q=0&b=1&p=0&a=1",
      city: "London",
      country: "uk",
      name: "warp records",
      street: "Fake street",
      streetNb: 100
    };


    const labelSeed = await LabelModel.create(label);

    const artist =
    {
      name: "Fake Band",
      isBand: true,
      description: "Just a fake music band",
      rates: [],
      style: styleSeed._id
    };

    const artistSeed = await artistModel.create(artist);

    const album = {
      cover:
        "https://s2.qwant.com/thumbr/0x0/6/a/f2b4b44327de1f74f7e6b5075f1ab07547edd89857d33ec0265a4fff72a6bc/default-album-artwork.png?u=http%3A%2F%2Fbobjames.com%2Fwp-content%2Fthemes%2Fsoundcheck%2Fimages%2Fdefault-album-artwork.png&q=0&b=1&p=0&a=1",
      title: "foo",
      releaseDate: "1980-01-13T00:00:00.000+00:00",
      artist: artistSeed._id,
      label: labelSeed._id,
      description: "top album",
      rates: []
    }

    const albumSeed = await albumModel.create(album);

    console.log("All good");
    console.log(styleSeed,
      labelSeed,
      artistSeed,
      albumSeed);

  }
  catch (err) {
    console.error(err)
  }
}

seedIt()

