import React from "react";
import { useDispatch } from "react-redux";
import "./recipecard.css";

const apiUrl = import.meta.env.VITE_API_URL;
import {
  deleteRecipeThunk,
  favoriteRecipeThunk,
  getRecipesThunk,
} from "../features/recipe/recipe-thunk";

const RecipeCard = ({ recipe, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteRecipeThunk(recipe._id));
  };
  const handleFavorite = async () => {
    await dispatch(favoriteRecipeThunk(recipe._id));
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        {recipe.image ? (
          <img
            src={`${apiUrl}/${recipe.image}`}
            alt={recipe.title}
            className="recipe-img"
          />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}

        <button className="favorite-icon" onClick={handleFavorite}>
          {recipe.isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="recipe-content">
        <h3>{recipe.title}</h3>

        <p>{recipe.description}</p>

        <span className="recipe-category">{recipe.category}</span>

        <h4>Ingredients</h4>

        <ul className="ingredient-list">
          {recipe.ingredients?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="recipe-actions">
          <button className="edit-btn" onClick={() => onEdit(recipe)}>
            Edit
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
