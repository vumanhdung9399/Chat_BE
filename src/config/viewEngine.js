const express = require("express");
const path = require("path");

const viewEngine = (app) => {
  app.set("routes", path.join(__dirname, "routes"));
  app.use(express.static(path.join(__dirname, "public")));
};

module.exports = viewEngine;
