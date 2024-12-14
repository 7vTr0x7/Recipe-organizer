import { Recipe } from "../models/recipe.model.js";

export const getAllRecipes = async (req, res) => {
  try {
    console.log("lul");
    const recipes = await Recipe.find();
    if (recipes.length > 0) {
      res.status(200).json({ success: true, recipes });
    } else {
      res.status(404).json({ success: false, message: "recipes not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get recipes" });
  }
};

export const addRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    if (recipe) {
      res.status(200).json({ success: true, recipe });
    } else {
      res.status(404).json({ success: false, message: "recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add recipe" });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (recipe) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};
