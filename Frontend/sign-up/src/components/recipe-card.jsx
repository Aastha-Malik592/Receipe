import React from "react";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import {
  deleteRecipeThunk,
  favoriteRecipeThunk,
  getRecipesThunk,
} from "../features/recipe/recipe-thunk";

const RecipeCard = ({ recipe , onEdit}) => {
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

  if (favoriteRecipeThunk.fulfilled.match(result)) {
    toast.success("Favorite updated");

    dispatch(getRecipesThunk());
  } else {
    toast.error(result.payload);
  }
};

  return (
    
  <div className="recipe-card">

    <div className="recipe-image">

      

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

      <span className="recipe-category">
        {recipe.category}
      </span>

      <h4>Ingredients</h4>

      <ul className="ingredient-list">

        {recipe.ingredients?.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}

      </ul>

      <div className="recipe-actions">
<button
  className="edit-btn"
  onClick={() => onEdit(recipe)}
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
