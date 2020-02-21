require("./../config/mongo");

const albumModel = require("./../models/Album");
const artistModel = require("./../models/Artist");
const LabelModel = require("./../models/Label");
const styleModel = require("./../models/Style");


const styles = [
  {
    name: "electro",
    color: "#10ADED",
    wikiURL: "https://en.wikipedia.org/wiki/Electro_(music)"
  },
  {
    name: "rap",
    color: "#FA113D",
    wikiURL: "https://en.wikipedia.org/wiki/Rapping"
  },
  {
    name: "punk-rock",
    color: "#EB01A5",
    wikiURL: "https://en.wikipedia.org/wiki/Punk_rock"
  },
  {
    name: "jazz",
    color: "#101",
    wikiURL: "https://en.wikipedia.org/wiki/Jazz"
  },
  {
    name: "classical",
    color: "#1D1075",
    wikiURL: "https://en.wikipedia.org/wiki/Classical_music"
  },
  {
    name: "folk",
    color: "#f5f809",
    wikiURL: "https://en.wikipedia.org/wiki/Folk_music"
  }
];

const artists = [
  {
    name: "Prince",
    isBand: false,
    description: "Other King of pop",
    rates: [],
    style: "5de9c3cffa023e21a766a60a"
  },
  {
    name: "Wu Tang Clan",
    isBand: true,
    description: "Mythical band from Staten Island, NYC",
    rates: [],
    style: "5de9c3cffa023e21a766a60a"
  },
  {
    name: "Aphex Twin",
    isBand: true,
    description: "Electro Mozart",
    rates: [],
    style: "5de9c3cffa023e21a766a60a"
  },
  {
    name: "The ramones",
    isBand: true,
    description: "Hey ! Ho ! Let's go",
    rates: [],
    style: "5de9c3cffa023e21a766a60a"
  }
];

const albums = [
  {
    cover:
      "https://res.cloudinary.com/gdaconcept/image/upload/v1575822562/user-pictures/dbtqyzgxiknyxlxnpazm.jpg",
    title: "foo",
    releaseDate: "1980-01-13T00:00:00.000+00:00",
    artist: "5ded22b8701e2f8732a05147",
    description: "top album",
    rates: []
  }
];
