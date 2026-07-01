const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");

const upload = require("../middleware/upload");

const {
  createRecipe,
  getRecipes,

  getRecipeById,

  updateRecipe,

  deleteRecipe,

  favoriteRecipe,

  getFavoriteRecipes,
} = require("../controller/recipe-controller");

router.post(
  "/create",

  authMiddleware,

  upload.single("image"),

  createRecipe,
);

router.get(
  "/",

  authMiddleware,

  getRecipes,
);
router.get(
  "/favorites",

  authMiddleware,

  getFavoriteRecipes,
);

router.get(
  "/:id",

  authMiddleware,

  getRecipeById,
);

router.put(
  "/:id",

  authMiddleware,

  upload.single("image"),

  updateRecipe,
);

router.delete(
  "/:id",

  authMiddleware,

  deleteRecipe,
);

router.patch(
  "/favorite/:id",

  authMiddleware,

  favoriteRecipe,
);

module.exports = router;
