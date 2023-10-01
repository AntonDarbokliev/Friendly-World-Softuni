const { Schema, Types, model, default: mongoose } = require("mongoose");

const animalSchema = new Schema({
  name: { type: String, required: true },
  years: { type: String, required: true },
  kind: { type: String, required: true },
  imageUrl: { type: String, required: true },
  needs: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  donations: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: { type: Types.ObjectId },
});

const Animal = model('Animal', animalSchema)
module.exports = Animal  