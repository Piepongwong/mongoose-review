const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const Recipe = require("./models/Recipe.model");
const data = require("./data");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
const bodyParser = require("body-parser");

app.options('*', cors())
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
  })
  .catch((err) => {
    console.log("err", err);
  });





app.post("/recipes", (req, res) => {
  Recipe.create(req.body)
  .then((recipe)=> {
    res.send("Recipe created!")
  })
  .catch((err)=> {
    res.status(500).send("ooooeps")
  })
});




app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((err) => {
      res.status(500).json({ message: "ooooeps" });
    });
});

app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) res.status(404).json({ message: "No such recipe" });
      else res.json(recipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "ooooeps" });
    });
});

app.listen(3000, () => {
  console.log("Express running");
});
