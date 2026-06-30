import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/navbar";
import RecipeCard from "../components/recipe-card";
import "./Home.css";

import Modal from "../components/modal";
import RecipeForm from "../components/recipe-form";
import {
  getRecipesThunk,
  createRecipeThunk,
  updateRecipeThunk,
} from "../features/recipe/recipe-thunk";
import toast from "react-hot-toast";
const Home = () => {
  const dispatch = useDispatch();

  const { recipes, loading, totalPages } = useSelector((state) => state.recipe);
 
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;
  const [showFavorites, setShowFavorites] = useState(false);

useEffect(() => {
  dispatch(
    getRecipesThunk({
      page,
      limit,
      search,
      category,
      favorites: showFavorites,
    })
  );
}, [dispatch, page, search, category, showFavorites]);
  useEffect(() => {
    setPage(1);
  }, [search, category, showFavorites]);
  const handleSubmitRecipe = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);

    formData.append(
      "ingredients",
      JSON.stringify(form.ingredients.split(",").map((item) => item.trim())),
    );

    formData.append("category", form.category);

    if (image) {
      formData.append("image", image);
    }

    let result;

    if (editingRecipe) {
      result = await dispatch(
        updateRecipeThunk({
          id: editingRecipe._id,
          data: formData,
        }),
      );
    } else {
      result = await dispatch(createRecipeThunk(formData));
    }

    if (
      createRecipeThunk.fulfilled.match(result) ||
      updateRecipeThunk.fulfilled.match(result)
    ) {
      toast.success(editingRecipe ? "Recipe Updated" : "Recipe Created");

  dispatch(
  getRecipesThunk({
    page,
    limit,
    search,
    category,
    favorites: showFavorites,
  })
);


      setIsOpen(false);
      setEditingRecipe(null);

      setForm({
        title: "",
        description: "",
        ingredients: "",
        category: "",
      });

      setImage(null);
    } else {
      toast.error(result.payload);
    }
  };



  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

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

            <p>Create, manage and organize your recipes</p>
          </div>

          
 <button
  className="home-btn"
  onClick={() => {
    setEditingRecipe(null);

    setForm({
      title: "",
      description: "",
      ingredients: "",
      category: "",
    });

    setImage(null);

    setIsOpen(true);
  }}
>
  Create Recipe
</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : recipes.length === 0 ? (
          <p className="no-recipe">No recipes found</p>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onEdit={(recipe) => {
                  setEditingRecipe(recipe);

                  setForm({
                    title: recipe.title,
                    description: recipe.description,
                    ingredients: recipe.ingredients.join(", "),
                    category: recipe.category,
                  });

                  setImage(null);

                  setIsOpen(true);
                }}
              />
            ))}
          </div>
        )}
      <div className="pagination">
  <button
    className="page-btn"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    ← Previous
  </button>

  <span className="page-number">
    {page} / {totalPages}
  </span>

  <button
    className="page-btn"
    disabled={page >= totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next →
  </button>
</div>
    
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);

          setEditingRecipe(null);

          setForm({
            title: "",
            description: "",
            ingredients: "",
            category: "",
          });

          setImage(null);
        }}
        title={editingRecipe ? "Edit Recipe" : "Create Recipe"}
      >
        <RecipeForm
        
          form={form}
          setForm={setForm}
          image={image}
          setImage={setImage}
          handleSubmit={handleSubmitRecipe}
          buttonText={editingRecipe ? "Update Recipe" : "Create Recipe"}
        />
      </Modal>
    </>
  );
};

export default Home;
