const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    let promises = [];
    // Run your code here, after you have insured that the connection was made and the database has been dropped
    promises.push(
      Recipe.create({
        title: "Flash Seared Skirt Steak",
        level: "Amateur Chef",
        ingredients: [
          "10oz Skirt Steak",
          "3 cloves of garlic",
          "3 tablespoons olive oil",
          "3 tablespoons soy sauce",
          "3 tablespoons balsamic vinaigrette",
          "5 tablespoons honey",
        ],
        cuisine: "Steakhouse",
        dishType: "breakfast",
        image: "https://images.media-allrecipes.com/images/75131.jpg",
        duration: 240,
      })
    );

    promises.push(Recipe.insertMany(data));

    return Promise.all(promises);
  })
  .then((recipes) => {
    let promises = [];

    promises.push(
      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      )
    );

    promises.push(
      Recipe.findOneAndDelete({ title: "Flash Seared Skirt Steak" })
    );

    return Promise.all(promises);
  })
  .then((recipe) => {
    console.log("done");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
