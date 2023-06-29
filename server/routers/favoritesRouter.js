const express = require('express');
const favoritesController = require('../controllers/favoritesController');
const router = express.Router();

// router.post('/', favoritesController.createUser, (req, res) =>
//   res.status(200).json(res.locals.user)
// );

router.get('/getFavorites', favoritesController.getFavorites, (req, res) => {
    res.status(200).json(res.locals.favorites);
  });

router.post('/addRecipe', favoritesController.addRecipe, (req, res) => {
  res.status(200).json('Successfully added recipe');
});

module.exports = router;
