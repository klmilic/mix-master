// const User = require('../models/mongoModel.js');
const db = require('../models/SQLModel');

const favoritesController = {};

favoritesController.getFavorites = async (req, res, next) => {
    const { username } = req.cookies;
    const values = [username];
  
    const query = `SELECT favourites
    FROM users
    WHERE username = $1`;
  
    try {
      const { rows } = await db.query(query, values);
      const favoritesArray = rows[0].favourites;
      // generate query string based on favorite cocktail array
      let conditions = '';
      for (let i = 0; i < favoritesArray.length; i++) {
        conditions += `Name = '${favoritesArray[i]}'`;
        if (i !== favoritesArray.length - 1) {
            conditions += ' OR ';
        }
      }

      const getRecipes = `SELECT * FROM cocktails WHERE ${conditions}`;
      const favoritesData = await db.query(getRecipes);
      
      res.locals.favorites = favoritesData.rows;
      next();
    } catch (err) {
      console.log('Error retrieving favorites: ', err);
      next(err);
    }
};

// add recipe to favorites
favoritesController.addRecipe = async (req, res, next) => {
  const { username } = req.cookies;
  const { name, ingredients, instructions } = req.body;
  const formattedName = name.replace("'", '');
  const values = [formattedName, username];

  try {
    // to cocktail name to user's favorites array
    const query = `UPDATE users
    SET favourites = array_append(users.favourites, $1)
    WHERE username = $2`;
    await db.query(query, values);
    // add recipe to cocktail table if it doesn't already exist
    const getRecipe = `SELECT * FROM cocktails WHERE Name = '${formattedName}'`;
    const recipeRes = await db.query(getRecipe);
    console.log('ingredients: ', ingredients);
    if (recipeRes.rowCount === 0) {
        const addRecipe = `INSERT INTO cocktails (Name, Ingredients, Instructions)
                           VALUES ('${formattedName}', ARRAY[${ingredients.map(element => `'${element}'`)}], '${instructions}')`;
        const addRecipeRes = await db.query(addRecipe);
    }
    console.log('successfully added cocktail to favorites list');
    next();
  } catch (err) {
    console.log('Error adding recipe to database: ', err);
    next(err);
  }
};

module.exports = favoritesController;
