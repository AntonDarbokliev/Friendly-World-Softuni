const express = require("express");
const expressConfig = require("./config/express.js");
const routeConfig = require("./config/routes.js");

const PORT = 3000;

function start() {
  const app = express();
  expressConfig(app);
  routeConfig(app);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();
