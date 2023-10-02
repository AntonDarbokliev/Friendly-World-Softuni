const animalController = require("express").Router();
const Animal = require("../models/Animal.js");
const { create, getAll, findAnimal } = require("../services/animalService.js");
const { getById } = require("../services/animalService.js");

//Create

animalController.get("/create", (req, res) => {
  res.render("create", {
    title: "Add animal",
  });
});

animalController.post("/create", async (req, res) => {
  try {
    const result = await create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

//Detalis

animalController.get("/:id/details", async (req, res) => {
  try {
    const animal = await getById(req.params.id);
    res.render("details", {
      title: "Animal Details",
      animal,
    });
  } catch (err) {
    console.log(err);
  }
});

//Dashboard

animalController.get("/dashboard", async (req, res) => {
  try {
    const animals = await getAll();
    res.render("dashboard", {
      title: "Animal Dashboard",
      animals,
    });
  } catch (err) {
    console.log(err);
  }
});

//Search
animalController.get("/search", async (req, res) => {
  try {
    const searchValue = req.query.search;
    let animals;
    if (searchValue) {
      animals = await findAnimal(searchValue);
    }else{
        animals = await getAll()
    }
    res.render("search", {
      title: "Animal Search",
      animals
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = animalController;
