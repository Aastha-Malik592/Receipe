const Recipe = require("../models/recipe");

exports.createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, category } = req.body;

    const recipe = await Recipe.create({
      title,

      description,

      ingredients: JSON.parse(ingredients),

      category,

      image: req.file ? req.file.path : null,

      userId: req.user._id,
    });

    res.status(201).json({
      success: true,

      message: "Recipe Created",

      recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getRecipes = async (req, res) => {
  

  try {
const {
  page = 1,
  limit = 6,
  search = "",
  category = "",
  favorites,
} = req.query;

    const query = {
      userId: req.user._id,
    };
    if (favorites === "true") {
  query.isFavorite = true;
}

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    const total = await Recipe.countDocuments(query);

    const recipes = await Recipe.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      recipes,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,

      userId: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.json({
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,

      userId: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    const { title, description, ingredients, category } = req.body;

    recipe.title = title || recipe.title;

    recipe.description = description || recipe.description;

    if (ingredients) {
      recipe.ingredients = JSON.parse(ingredients);
    }

    recipe.category = category || recipe.category;

    if (req.file) {
      recipe.image = req.file.path;
    }

    await recipe.save();

    res.json({
      message: "Recipe Updated",

      recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,

      userId: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.json({
      message: "Recipe Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.favoriteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,

      userId: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    recipe.isFavorite = !recipe.isFavorite;

    await recipe.save();

    res.json({
      message: "Favorite Updated",

      recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getFavoriteRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      userId: req.user._id,

      isFavorite: true,
    });

    res.json({
      success: true,

      recipes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
