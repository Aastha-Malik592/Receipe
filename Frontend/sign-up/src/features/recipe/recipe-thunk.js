import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const getToken = (state) => {
  console.log("Auth State:", state.auth);
  console.log("Token:", state.auth.token);
  return state.auth.token;
};
export const createRecipeThunk = createAsyncThunk(
  "recipe/create",

  async (data, { rejectWithValue, getState }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/recipes/create`,

        data,

        {
          headers: {
            Authorization: `Bearer ${getToken(getState())}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
export const getRecipesThunk = createAsyncThunk(
  "recipe/get",

  async (
    {
      page = 1,
      limit = 6,
      search = "",
      category = "",
      favorites = false,
    } = {},
    { rejectWithValue, getState }
  ) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/recipes?page=${page}&limit=${limit}&search=${search}&category=${category}&favorites=${favorites}`,
        {
          headers: {
            Authorization: `Bearer ${getToken(getState())}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

     



export const deleteRecipeThunk = createAsyncThunk(
  "recipe/delete",

  async (id, { rejectWithValue, getState }) => {
    try {
      await axios.delete(
        `${apiUrl}/api/recipes/${id}`,

        {
          headers: {
            Authorization: `Bearer ${getToken(getState())}`,
          },
        },
      );

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateRecipeThunk = createAsyncThunk(
  "recipe/update",

  async ({ id, data }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/recipes/${id}`,

        data,

        {
          headers: {
            Authorization: `Bearer ${getToken(getState())}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const favoriteRecipeThunk = createAsyncThunk(
  "recipe/favorite",

  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/recipes/favorite/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${getToken(getState())}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// FAVORITE LIST

export const getFavoriteRecipesThunk = createAsyncThunk(
  "recipe/favorites",

  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/recipes/favorites`,

        {
          headers: {
            Authorization: `Bearer ${getToken(getState())}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
