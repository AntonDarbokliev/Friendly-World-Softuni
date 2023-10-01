const Animal = require("../models/Animal.js");

async function create(animalData) {
  const animal = {
    name: animalData.name,
    years: animalData.years,
    kind: animalData.kind,
    imageUrl: animalData.imageUrl,
    needs: animalData.needs,
    location: animalData.location,
    description: animalData.description,
    donations: animalData.donations,
  };
  const result = await Animal.create(animal);
  console.log(result);

  return result;
}

async function getAll() {
  return Animal.find({}).lean();
}

module.exports = {
  create,
  getAll,
};
