import { createSlice } from "@reduxjs/toolkit";

import {
  createRecipeThunk,
  getRecipesThunk,
  deleteRecipeThunk,
  updateRecipeThunk,
  favoriteRecipeThunk,
  getFavoriteRecipesThunk,
} from "./recipe-thunk";

const initialState = {
  recipes: [],
  favorites: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  total: 0,
};

const recipeSlice = createSlice({
  name: "recipe",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE RECIPE

      .addCase(createRecipeThunk.fulfilled, (state, action) => {
        state.recipes.push(action.payload.recipe);
      })

      // GET RECIPES

      .addCase(getRecipesThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRecipesThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.recipes = action.payload.recipes;

        state.page = action.payload.page;

        state.totalPages = action.payload.totalPages;

        state.total = action.payload.total;
      })

      .addCase(getRecipesThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // DELETE

      .addCase(deleteRecipeThunk.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          (item) => item._id !== action.payload,
        );
      })

      // UPDATE

      .addCase(updateRecipeThunk.fulfilled, (state, action) => {
        const index = state.recipes.findIndex(
          (item) => item._id === action.payload.recipe._id,
        );

        if (index !== -1) {
          state.recipes[index] = action.payload.recipe;
        }
      })

      .addCase(favoriteRecipeThunk.fulfilled, (state, action) => {
        const index = state.recipes.findIndex(
          (item) => item._id === action.payload.recipe._id,
        );

        if (index !== -1) {
          state.recipes[index] = action.payload.recipe;
        }
      })

      .addCase(getFavoriteRecipesThunk.fulfilled, (state, action) => {
        state.favorites = action.payload.recipes;
      });
  },
});

export default recipeSlice.reducer;
