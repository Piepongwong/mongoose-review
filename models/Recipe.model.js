const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: { type: String, required: true},
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [String],
  cuisine: String,
  dishType: {
    type: String, 
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  image: String,
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: Schema.Types.ObjectId, ref: "Cook"
  },
  author: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  }
});


const Recipe = mongoose.model('Recipe', recipeSchema, "recipes");

module.exports = Recipe;
