// initial config
require("dotenv").config(); // import all key/value pairs from .env in process.env : really usefull when going online :)
require("./config/mongo"); // database connection setup
require("./config/passport");
// dependencies injection
const express = require("express");
const session = require("express-session"); //sessions make data persist between http calls
const passport = require("passport"); // auth library (needs sessions)
const cors = require("cors");

const _DEVMODE = false;

// ------------------------------------------
// SERVER CONFIG
// ------------------------------------------
const server = express();

// // Allow server to parse body from POST Request
// server.use(express.urlencoded({ extended: true }));

/**
 *  HEY YOU ! GOOD that you read comments, the lines below are MANDATORY :)
 */

// Allow server to parse JSON from AJAX Request and apply the data to req.body
server.use(express.json());

// Allow server to parse cookies from http requests headers
// server.use(cookieParser());

/*
Create a session middleware with the given options.
Note:  Session data is not saved in the cookie itself, just the session ID. 
Session data is stored server-side.
*/
server.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
  })
);

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

// passport init : these rules MUST set be after session setup (lines above)
server.use(passport.initialize());
server.use(passport.session());

//------------------------------------------
// Check Loggedin Users
// ------------------------------------------

server.use(function setDevTestLoggedinUser(req, res, next) {
  if (_DEVMODE === true) {
    console.log(`
    ***
    dev mode on ? ${_DEVMODE} !`);

    req.user = {
      _id: "5de525245bd24cfeb10abeb9",
      username: "guillaume",
      email: "gui@foo.bar",
      avatar:
        "https://res.cloudinary.com/gdaconcept/image/upload/v1575298339/user-pictures/jadlcjjnspfhknucjfkd.png",
      role: "admin",
      favorites: {
        artists: [],
        albums: [],
        styles: [],
        labels: []
      }
    };
  }
  next();
});

//------------------------------------------
// BASE BACKEND ROUTE
// ------------------------------------------

server.get("/", (req, res) => {
  res.send("backend server is running");
});

//------------------------------------------
// SPLITED ROUTING
// ------------------------------------------

const albumsRouter = require("./routes/albums.js");
const artistsRouter = require("./routes/artists.js");
const authRouter = require("./routes/auth.js");
const commentsRouter = require("./routes/comments.js");
const contactRouter = require("./routes/contact.js");
const labelRouter = require("./routes/labels.js");
const ratesRouter = require("./routes/rates.js");
const stylesRouter = require("./routes/styles.js");
const searchRouter = require("./routes/search.js");
const usersRouter = require("./routes/users.js");

server.use(albumsRouter);
server.use(artistsRouter);
server.use(authRouter);
server.use(commentsRouter);
server.use(contactRouter);
server.use(labelRouter);
server.use(ratesRouter);
server.use(searchRouter);
server.use(stylesRouter);
server.use(usersRouter);

// KICKSTART 

server.listen(process.env.PORT, () => {
  console.log(`
    yay ! app is ready:
    -------->
    backend server runs @ : http://localhost:${process.env.PORT}
    -------->
    client server runs @ : ${process.env.CLIENT_URL}
  `);
});
