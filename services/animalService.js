const Animal = require("../models/Animal.js");

async function create(animalData, userId) {
  const animal = {
    name: animalData.name,
    years: animalData.years,
    kind: animalData.kind,
    imageUrl: animalData.imageUrl,
    needs: animalData.needs,
    location: animalData.location,
    description: animalData.description,
    donations: animalData.donations,
    owner: userId,
  };
  const result = await Animal.create(animal);
  console.log(result);

  return result;
}

async function getAll() {
  return Animal.find({}).lean();
}

async function getById(id) {
  return Animal.findById(id).lean().populate('owner');
}

async function findAnimal(location) {
  return Animal.find({ location: { $regex: location, $options: "i" } }).lean();
}

async function edit(id, data) {
  return Animal.updateOne({ _id: id }, { $set: data }, { runValidators: true });
}

async function deleteAnimal(id) {
  return Animal.findByIdAndDelete(id);
}

async function donate(animalId,userId){
  return Animal.findByIdAndUpdate(animalId,{$push : {donations : userId}})
}

module.exports = {
  create,
  getAll,
  getById,
  findAnimal,
  edit,
  deleteAnimal,
  donate,
};
