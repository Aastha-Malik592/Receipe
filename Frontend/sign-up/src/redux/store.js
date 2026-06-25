import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth-slice";
import recipeReducer from "../features/recipe/recipe-slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    recipe: recipeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);