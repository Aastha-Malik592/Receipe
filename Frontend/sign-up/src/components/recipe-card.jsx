import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  deleteRecipeThunk,
  favoriteRecipeThunk,
} from "../features/recipe/recipe-thunk";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await dispatch(
      deleteRecipeThunk(recipe._id)
    );

    if (deleteRecipeThunk.fulfilled.match(result)) {
      toast.success("Recipe deleted");
    } else {
      toast.error(result.payload);
    }
  };

  const handleFavorite = async () => {
    await dispatch(
      favoriteRecipeThunk(recipe._id)
    );
  };

  return (
    <div className="recipe-card">

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
        />
      )}

      <div className="recipe-content">

        <h3>{recipe.title}</h3>

        <p>{recipe.description}</p>

        <span className="recipe-category">
          {recipe.category}
        </span>

        <div className="recipe-actions">

          <button
            className="edit-btn"
            onClick={handleFavorite}
          >
            {recipe.isFavorite
              ? "★ Favorite"
              : "☆ Favorite"}
          </button>

          <button
            className="edit-btn"
            onClick={() =>
              navigate(
                `/edit-recipe/${recipe._id}`
              )
            }
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default RecipeCard;