import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;


export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        data
      );

    
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);



export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/signup`,
        data
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);