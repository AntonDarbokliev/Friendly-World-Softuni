const cookieParser = require("cookie-parser");
const animalController = require("../controllers/animalController.js");
const homeController = require("../controllers/homeController.js");
const userController = require("../controllers/userController.js");
module.exports = (app) => {
  app.use(homeController);
  app.use(cookieParser())
  app.use("/animal", animalController);
  app.use("/user", userController);
};
