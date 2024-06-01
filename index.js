// index.js
import 'dotenv/config'

import express from 'express'
import { connectDB } from './config/connectDB.js';
import { Person } from './models/person.js';

const app = express();
const port = 4000;

// printing what should appear in our browser when we open localhost:5000
app.get('/', (req, res,) => {
    res.send("Hello Mongoose Checkpoint")
});



// Create a new person
const newPerson = new Person({
  name: 'John Doe',
  age: 30,
  favoriteFoods: ['Pizza', 'Burger', 'Pasta']
});

// Save the person to the database
newPerson.save()
  .then(person => console.log('Person saved:', person))
  .catch(err => console.log(err));

// Array of many people
  const people = [
    { name: "Alice", age: 25, favoriteFoods: ["Burgers", "Fries"] },
    { name: "Bob", age: 32, favoriteFoods: ["Pasta", "Sushi"] },
    { name: "Charlie", age: 40, favoriteFoods: ["Steak", "Potatoes", "Burgers"] },
    { name: "John Doe", age: 38, favoriteFoods: ["Pizza", "Sushi", "Pasta"]}
  ];
  
  async function createPeople() {
    try {
      const data = await Person.create(people);
      console.log("People created successfully:", data);
    } catch (err) {
      console.error("Error creating people:", err);
    }
  }
  
  createPeople();


  // Search for people named "Alice"
const nameToFind = "Alice";

Person.find({ name: nameToFind })
  .then(people => {
    if (people.length > 0) {
      console.log("Found people:", people);
    } else {
      console.log("No person found with name:", nameToFind);
    }
  })
  .catch(err => {
    console.error("Error finding people:", err);
  });


// Food to search for
const favoriteFood = "Pizza";

Person.findOne({ favoriteFoods: favoriteFood })
  .then(person => {
    if (person) {
      console.log("Found person:", person);
    } else {
      console.log("No person found with favorite food:", favoriteFood);
    }
  })
  .catch(err => {
    console.error("Error finding person:", err);
  });


// find one and update the person age
  async function updatePersonAge(personName) {
    try {
      const updatedPerson = await Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true }
      );
  
      if (updatedPerson) {
        console.log("Person updated successfully:", updatedPerson);
      } else {
        console.log("No person found with name:", personName);
      }
    } catch (err) {
      console.error("Error updating person:", err);
    }
  }
  
  // Name to update
  const nameToUpdate = "Alice";
  updatePersonAge(nameToUpdate);


// deleting a document 
  async function deletePerson(personId) {
    try {
      const deletedPerson = await Person.findByIdAndDelete(personId);
  
      if (deletedPerson) {
        console.log("Person deleted successfully:", deletedPerson);
      } else {
        console.log("No person found with ID:", personId);
      }
    } catch (err) {
      console.error("Error deleting person:", err);
    }
  }
  
  // deleting using id
  const idToDelete = '665ba7ebd8db0ec3ad885a50';// _id: for John Doe
  deletePerson(idToDelete);


// Deleting Many Documents
  function deletePeopleByName(nameToDelete, done) {
    Person.deleteMany({ name: nameToDelete })
      .then(result => {
        console.log("People deleted:", result);
        done(null, result); 
      })
      .catch(err => {
        console.error("Error deleting people:", err);
        done(err); 
      });
  }
  
  // name to delete
  const name = "Charlie";
  deletePeopleByName(name, (err, result) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("Deleted count:", result.deletedCount); // Access deleted count
    }
  });


//   Using Chain Query Helper: sort, limit, select
async function findBurgersLovers() {
    try {
      const people = await Person.find({ favoriteFoods: "Burgers" })
        .sort({ name: 1 })
        .limit(2)
        .select({ age: 0 });
  
      console.log("Found people who like Burgers:", people);
    } catch (err) {
      console.error("Error finding people:", err);
    }
  }
  
  findBurgersLovers();


// using Classic Update to update Document
  async function updatePersonFavorites(personId) {
    try {
      const person = await Person.findById(personId);
  
      if (person) {
        person.favoriteFoods.push("hamburger"); // Add "hamburger" to favorites
        await person.save();
        console.log("Person updated successfully:", person);
      } else {
        console.log("No person found with ID:", personId);
      }
    } catch (err) {
      console.error("Error updating person:", err);
    }
  }
  
  // id to update
  const idToUpdate = "665b9cbaec74ed9f8135f50e"; 
  updatePersonFavorites(idToUpdate);


//   Port where the code is running on the browser
  app.listen(port, async (req, res) => {
    try{
        await connectDB();
        console.log(`server has successfully connected`);
    } catch (error) {
        console.log(`error connecting to database`);
    }
});