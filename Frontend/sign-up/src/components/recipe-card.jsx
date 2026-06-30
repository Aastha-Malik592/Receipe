import React from "react";
import { useDispatch } from "react-redux";
import "./recipecard.css";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;
import {
  deleteRecipeThunk,
  favoriteRecipeThunk,
  getRecipesThunk,
} from "../features/recipe/recipe-thunk";

const RecipeCard = ({ recipe, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const result = await dispatch(deleteRecipeThunk(recipe._id));

    if (deleteRecipeThunk.fulfilled.match(result)) {
      toast.success("Recipe deleted");
    } else {
      toast.error(result.payload);
    }
  };

  
 const handleFavorite = async () => {
  const result = await dispatch(
    favoriteRecipeThunk(recipe._id)
  );

  console.log("Favorite Result:", result);
  console.log("Payload:", result.payload);
console.log(
  "isFavorite:",
  result.payload.recipe.isFavorite
);

 if (favoriteRecipeThunk.fulfilled.match(result)) {
  toast.success("Favorite Updated");
}
  else {
    toast.error(result.payload);
  }
};
console.log(recipe.image);
console.log(recipe)
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

  <button
    className="favorite-icon"
    onClick={handleFavorite}
  >
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
