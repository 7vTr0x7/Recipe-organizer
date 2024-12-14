import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    cuisineType: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting recipe...");

    const { name, imageUrl, cuisineType, ingredients, instructions } = formData;
    if (!name || !imageUrl || !cuisineType || !ingredients || !instructions) {
      toast.error("All fields are required.", { id: toastId });
      return;
    }

    try {
      const res = await fetch(
        "https://recipe-organizer-backend.vercel.app/api/user/add/recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit recipe");
      }

      const data = await res.json();
      if (data.success) {
        toast.success("Recipe added successfully!", { id: toastId });
        setFormData({
          name: "",
          imageUrl: "",
          cuisineType: "",
          ingredients: "",
          instructions: "",
        });
      } else {
        throw new Error(data.message || "Failed to add recipe");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while submitting", {
        id: toastId,
      });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3 mb-5">
        <p className="fs-4 fw-semibold"> Add Recipe</p>
        <form onSubmit={handleSubmit} className="container mt-4">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              className="form-control"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cuisineType" className="form-label">
              Cuisine Type
            </label>
            <input
              type="text"
              id="cuisineType"
              name="cuisineType"
              className="form-control"
              value={formData.cuisineType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              className="form-control"
              value={formData.ingredients}
              onChange={handleChange}
              rows="3"
              required></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              className="form-control"
              value={formData.instructions}
              onChange={handleChange}
              rows="3"
              required></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Recipe
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default RecipeForm;
