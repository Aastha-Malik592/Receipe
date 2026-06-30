import React from "react";
import "./recipeform.css";

const RecipeForm = ({
  form,
  setForm,
  image,
  setImage,
  handleSubmit,
  buttonText,
}) => {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={form.ingredients}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Dessert">Dessert</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {image && (
        <img
          src={
            image instanceof File
              ? URL.createObjectURL(image)
              : image
          }
          alt="Preview"
          className="recipe-preview"
        />
      )}

      <button type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default RecipeForm;