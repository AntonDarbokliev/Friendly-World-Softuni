const animalController = require("../controllers/animalController.js");
const homeController = require("../controllers/homeController.js");

module.exports = (app) => {
  app.use(homeController);
  app.use("/animal", animalController);
};
