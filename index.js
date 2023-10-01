const express = require("express");
const expressConfig = require("./config/express.js");

const PORT = 3000;

function start() {
  const app = express();
  expressConfig(app);
  app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
}

start();
