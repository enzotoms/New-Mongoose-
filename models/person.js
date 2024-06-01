// Person.js
import mongoose  from "mongoose";

// Define the schema for a Person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  }
});

// Create the model for a Person
const Person = mongoose.model('Person', personSchema);

export { Person }
