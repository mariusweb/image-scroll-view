const express = require("express");
const app = express();
require("dotenv").config();
const fetch = require("node-fetch");

const port = process.env.PORT;
app.listen(port, () => console.log("listening at 3000"));
app.use(express.static("public"));

app.use(express.json({ limit: "1gb" }));

const image = process.env.LOREM_IMAGE;
const url = process.env.LOREM_URL;

app.post("/api", (request, response) => {
  const id = request.body.id;

  const imageConfig = `${image}${id}`;
  const loremUrl = `${url}`;
  const imageId = eval(imageConfig);

  async function getImages(url) {
    let res = await fetch(url);
    let urlData = await res.json();
    return urlData;
  }

  const urlFull = `${loremUrl}${eval(imageId)}/info`;

  getImages(urlFull).then((imageData) => {
    if (imageData.id == imageId) {
      response.send({
        url: loremUrl,
        imageData: imageData,
      });
    }
  });
});
