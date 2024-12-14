import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const RecipeDetails = () => {
  const location = useLocation();

  const recipe = location?.state?.recipe;

  return (
    <>
      <Navbar />
      <div className="mt-5 container">
        <p className="fs-5 fw-semibold">{recipe.name}</p>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={recipe.imageUrl}
                className="img-fluid rounded-start h-100 w-100"
                alt={recipe.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <b>Cuisine: </b>
                  {recipe.cuisineType}
                </h5>
                <div className="card-text">
                  <p className="fw-semibold mb-1">Ingredients:</p>
                  <p>{recipe.ingredients}</p>
                </div>
                <div className="card-text">
                  <p className="fw-semibold mb-1">Instructions:</p>
                  <p>{recipe.instructions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
