import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const [text, setText] = useState("");
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const res = await fetch(
        "https://recipe-organizer-backend.vercel.app/api/user/all/recipes"
      );

      if (!res.ok) {
        console.log("Failed to fetch");
      }

      const data = await res.json();
      if (data.success) {
        setRecipes(data.recipes);
      }
    } catch (error) {
      console.log("Failed to get recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [recipes.length]);

  const deleteHandler = async (id) => {
    const toastId = toast.loading("Deleting recipe...");

    try {
      const res = await fetch(
        `https://recipe-organizer-backend.vercel.app/api/user/delete/recipe/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      const data = await res.json();
      if (data.success) {
        toast.success("Recipe deleted successfully!", { id: toastId });

        await fetchRecipes();
      }

      throw new Error("Failed to delete recipe");
    } catch (error) {
      toast.error(error.message || "Failed to delete recipe", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <Navbar />
      <div className="my-5 container">
        <input
          type="text"
          value={text}
          placeholder="search by recipe name . . ."
          className="form-control mb-3 w-25"
          onChange={(e) => setText(e.target.value)}
        />
        <p className="fs-4 fw-semibold">All Recipes:</p>
        <div className="row g-3">
          {recipes?.length > 0 &&
            recipes
              .filter((recipe) => recipe.name.includes(text))
              .map((recipe) => (
                <div key={recipe._id} className="col-md-3 ">
                  <div className="card pb-3">
                    <img
                      alt={recipe.name}
                      src={recipe.imageUrl}
                      className="card-img-top"
                      onClick={() =>
                        navigate("/recipe-details", { state: { recipe } })
                      }
                    />
                    <p className="m-0 px-3 pt-1 fw-semibold fs-4">
                      {recipe.name}
                    </p>
                    <p style={{ fontSize: "12px" }} className="m-0 px-3 pt-1 ">
                      {" "}
                      <b>Cuisine Type:</b> {recipe.cuisineType}
                    </p>
                    <p style={{ fontSize: "12px" }} className="m-0 px-3 pt-1 ">
                      {" "}
                      <b>Ingredients:</b>{" "}
                      <span
                        style={{ textDecoration: "underline" }}
                        onClick={() =>
                          navigate("/recipe-details", { state: { recipe } })
                        }>
                        {" "}
                        See Details
                      </span>
                    </p>
                    <p style={{ fontSize: "12px" }} className="m-0 px-3 pt-1 ">
                      {" "}
                      <b>Instruction:</b>{" "}
                      <span
                        style={{ textDecoration: "underline" }}
                        onClick={() =>
                          navigate("/recipe-details", { state: { recipe } })
                        }>
                        {" "}
                        See Details
                      </span>
                    </p>
                    <button
                      className="btn btn-danger mt-3 mx-2"
                      onClick={() => deleteHandler(recipe._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Home;
