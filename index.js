const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const uuid = require("uuid");

dotenv.config({ quiet: true });

const config = {
  isDev: (process.env.NODE_ENV || "").toLowerCase() !== "production",
  port: process.env.PORT || 3000,
};

const app = express();

app.use(express.static(path.join(__dirname, "client", "dist")));

if (config.isDev) {
  const webpackDev = require("./src/dev.js");
  app.use(webpackDev.dev);
  app.use(webpackDev.hot);
  //app.use(webpackDev.comp).use(webpackDev.hot);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.get("/info", (req, res) => {
  res.json({
    date: new Date(),
    isDev: config.isDev,
    uuid: uuid.v4(),
    secret: process.env.SOME_SECRET,
  });
});

app.listen(config.port, () => {
  console.log(`Listening; ${config.port}`);
});
