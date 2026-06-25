import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getRecipesThunk } from "../features/recipe/recipe-thunk";
import RecipeCard from "../components/recipe-card";

const Home = () => {
  const dispatch = useDispatch();

  const { recipes, loading } = useSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    dispatch(getRecipesThunk());
  }, [dispatch]);

  return (
    <div className="home-container">

      <div className="home-banner">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="Recipe Banner"
        />
      </div>

      <div className="home-header">

        <div>
          <h1>Recipe Management</h1>

          <p>
            Create, manage and organize your recipes
          </p>
        </div>

        <div className="home-actions">
          <Link to="/create-recipe">
            <button className="home-btn">
              Create Recipe
            </button>
          </Link>
        </div>

      </div>

      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p className="no-recipe">
          No recipes found
        </p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;