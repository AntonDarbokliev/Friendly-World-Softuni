const { getAll } = require("../services/animalService.js");

const homeController = require("express").Router();

homeController.get("/", async (req, res) => {
  try {
    const animals = await getAll();

    res.render("home", {
      title: "Home",
      animals
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = homeController;
