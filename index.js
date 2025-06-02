const { initializeDatabase } = require("./db/db.connect");
const Recipe = require("./models/recipe.model");
initializeDatabase();

const express = require("express");
const app = express();
app.use(express.json());

const createNewRecipe = async (newRecipe) => {
  try {
    const recipe = new Recipe(newRecipe);
    const saveRecipe = await recipe.save();
    return saveRecipe;
  } catch (error) {
    throw error;
  }
};

app.post("/recipes", async (req, res) => {
  try {
    const recipe = await createNewRecipe(req.body);
    if (recipe) {
      res
        .status(200)
        .json({ message: "New recipe created successfully.", recipe: recipe });
    } else {
      res
        .status(400)
        .json({ error: "Invalid data. Unable to create new recipe." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating a new recipe." });
  }
});

const getAllRecipes = async () => {
  try {
    const recipes = await Recipe.find();
    return recipes;
  } catch (error) {
    throw error;
  }
};

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    if (recipes) {
      res.status(200).json({
        message: "Successfully fetched all recipes.",
        recipes: recipes,
      });
    } else {
      res.status(404).json({ error: "No recipes found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching all recipes." });
  }
});

const getRecipesByTitle = async (recipeTitle) => {
  try {
    const recipeByTitle = await Recipe.find({ title: recipeTitle });
    return recipeByTitle;
  } catch (error) {
    throw error;
  }
};

app.get("/recipes/title/:recipeTitle", async (req, res) => {
  try {
    const recipeByTitle = await getRecipesByTitle(req.params.recipeTitle);
    if (recipeByTitle) {
      res.status(200).json({
        message: "Successfully fetched all recipes by title.",
        recipes: recipeByTitle,
      });
    } else {
      res.status(404).json({ error: "No recipes found by title." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes." });
  }
});

const getRecipesByAuthor = async (recipeAuthor) => {
  try {
    const recipes = await Recipe.find({ author: recipeAuthor });
    return recipes;
  } catch (error) {
    throw error;
  }
};

app.get("/recipes/author/:recipeAuthor", async (req, res) => {
  try {
    const recipes = await getRecipesByAuthor(req.params.recipeAuthor);
    if (recipes) {
      res.status(200).json({
        message: "Recipes successfully fetched by author name.",
        recipes: recipes,
      });
    } else {
      res.status(404).json({ error: "No recipes found by author name." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes by author." });
  }
});

const getRecipesByDifficulty = async (recipeDifficulty) => {
  try {
    const recipes = await Recipe.find({ difficulty: recipeDifficulty });
    return recipes;
  } catch (error) {
    throw error;
  }
};

app.get("/recipes/difficulty/:recipeDifficulty", async (req, res) => {
  try {
    const recipes = await getRecipesByDifficulty(req.params.recipeDifficulty);
    res.status(200).json({
      message: "Successfully fetched recipes by difficulty.",
      recipes: recipes,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes by difficulty." });
  }
});

const updateDifficultyById = async (recipeId, dataToUpdate) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      dataToUpdate,
      {
        new: true,
      }
    );
    return updatedRecipe;
  } catch (error) {
    throw error;
  }
};

app.post("/recipes/id/:recipeId", async (req, res) => {
  try {
    const updatedRecipe = await updateDifficultyById(
      req.params.recipeId,
      req.body
    );
    if (updatedRecipe) {
      res
        .status(200)
        .json({ message: "Recipe updated by Id.", recipe: updatedRecipe });
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe by Id." });
  }
});

const updateRecipeByTitle = async (recipeTitle, dataToUpdate) => {
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: recipeTitle },
      dataToUpdate,
      { new: true }
    );
    return updatedRecipe;
  } catch (error) {
    throw error;
  }
};

app.post("/recipes/title/:recipeTitle", async (req, res) => {
  try {
    const updatedRecipe = await updateRecipeByTitle(
      req.params.recipeTitle,
      req.body
    );
    if (updatedRecipe) {
      res
        .status(200)
        .json({ message: "Recipe updated by title.", recipe: updatedRecipe });
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe by title." });
  }
});

const deleteRecipeById = async (recipeId) => {
  try {
    const deleteRecipe = await Recipe.findByIdAndDelete(recipeId);
    return deleteRecipe;
  } catch (error) {
    throw error;
  }
};

app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const deletedRecipe = await deleteRecipeById(req.params.recipeId);
    if (deletedRecipe) {
      res
        .status(200)
        .json({
          message: "Recipe deleted successfully by Id.",
          recipe: deletedRecipe,
        });
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe by Id." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
