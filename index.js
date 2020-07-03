const express = require("express");
const app = express();
const Flickr = require("flickr-sdk");
const fetch = require("node-fetch");
require("dotenv").config();

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));

// const FLICKR_CONSUMER_KEY = "00ac5f70d662304b87e7da585bbdef9d";
// const FLICKR_CONSUMER_SECRET = "aff70630a261a66a";

let flickr = new Flickr(process.env.FLICKR_CONSUMER_KEY);

flickr.photos
  .getInfo({
    photo_id: 31253663191, // sorry, @dokas
  })
  .then(function (res) {
    console.log("yay!", res.body);
  })
  .catch(function (err) {
    console.error("bonk", err);
  });

// const oauth = new Flickr.OAuth(FLICKR_CONSUMER_KEY, FLICKR_CONSUMER_SECRET);
// oauth
//   .request("http://localhost:3000/oauth/callback")
//   .then(function (res) {
//     console.log("---------------------------------------yay!", res);
//   })
//   .catch(function (err) {
//     console.error("???????????????????????????????bonk", err);
//   });
