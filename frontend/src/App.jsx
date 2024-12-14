import React from "react";
import Home from "./pages/Home";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails";
import RecipeForm from "./components/RecipeForm";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe-details" element={<RecipeDetails />} />
          <Route path="/add-recipe" element={<RecipeForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
