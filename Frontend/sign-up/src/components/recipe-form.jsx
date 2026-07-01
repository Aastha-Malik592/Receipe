import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./recipeform.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema } from "../features/recipe/recipe-schema";
const RecipeForm = ({ form, image, setImage, handleSubmit, buttonText }) => {
  const {
    register,
    handleSubmit: submitForm,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: form,
  });

  useEffect(() => {
    reset(form);
  }, [form, reset]);

  return (
    <form className="recipe-form" onSubmit={submitForm(handleSubmit)}>
      <input {...register("title")} placeholder="Recipe Title" />

      <p className="error">{errors.title?.message}</p>

      <textarea {...register("description")} placeholder="Description" />
      <p className="error">{errors.description?.message}</p>
      <input
        {...register("ingredients")}
        placeholder="Ingredients (comma separated)"
      />

      <p className="error">{errors.ingredients?.message}</p>

      <select {...register("category")}>
        <option value="">Select Category</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Dessert">Dessert</option>
      </select>
      <p className="error">{errors.category?.message}</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {image && (
        <img
          src={image instanceof File ? URL.createObjectURL(image) : image}
          alt="Preview"
          className="recipe-preview"
        />
      )}

      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default RecipeForm;
