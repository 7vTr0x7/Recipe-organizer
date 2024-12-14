import express from "express";
import { addRecipe, deleteRecipe, getAllRecipes } from "../controllers/user.js";

const router = express.Router();

router.get("/all/recipes", getAllRecipes);
router.post("/add/recipe", addRecipe);
router.delete("/delete/recipe/:id", deleteRecipe);

export default router;
