import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./auth-thunk";
const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
   logout: (state) => {
  state.token = null;
  state.user = null;

  localStorage.removeItem("token");
},
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(loginThunk.fulfilled, (state, action) => {
  state.loading = false;

  state.token = action.payload.token;

  localStorage.setItem("token", action.payload.token);
})

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
