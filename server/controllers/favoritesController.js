// const User = require('../models/mongoModel.js');
const db = require('../models/SQLModel');

const favoritesController = {};

// // establish a user and a blank favorites list during signup
// favoritesController.createUser = (req, res, next) => {
//   const userId = 1;
//   User.create({ userId: userId }).then(
//     (res) => {
//       console.log('res: ', res);
//       next();
//     },
//     (err) => console.log(`Error: ${err}`)
//   );
// };


favoritesController.getFavorites = async (req, res, next) => {
    const { username } = req.cookies;
    const values = [username];
  
    const query = `SELECT favourites
    FROM users
    WHERE username = $1`
  
    try {
      const { rows } = await db.query(query, values);
      console.log('successfully retrieved favorites');
      res.locals.favorites = rows;
      next();
    } catch (err) {
      console.log('Error retrieving favorites: ', err);
      next(err);
    }
};

// add recipe to favorites
favoritesController.addRecipe = async (req, res, next) => {
  const { cocktailName } = req.body;
  const values = [cocktailName];

  const query = `UPDATE users
  SET favourites = array_append(users.favourites, $1)
  WHERE userid = 40`

  try {
    const { rows } = await db.query(query, values);
    console.log('successfully added cocktail to favorites list');
    next();
  } catch (err) {
    console.log('Error adding recipe to database: ', err);
    next(err);
  }
};

module.exports = favoritesController;
