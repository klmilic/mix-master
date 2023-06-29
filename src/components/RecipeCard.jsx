import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

function RecipeCard(props) {
  const [isStarred, setIsStarred] = useState(false);

  const handleClick = (cocktailName, ingredients, instructions) => {
    if (!props.loggedIn) {
      alert('Please login to add a recipe to your favorites.');
      return;
    }
    isStarred ? setIsStarred(false) : setIsStarred(true);
    fetch('/favorites/addRecipe', {
			method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cocktailName,
        ingredients: ingredients,
        instructions: instructions
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
      })
      .catch(err => console.log('Error in adding cocktail to favorites: ', err))
  }

  return (
    <div className='recipe-card'>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <h2>{props.recipeData.name}</h2> 
          <FaStar
          style={{ marginLeft: "10px", cursor: "pointer", color: isStarred ? "gold" : "grey" }}
          onClick={() => handleClick(props.recipeData.name, props.recipeData.ingredients, props.recipeData.instructions)}
          />
        </div>
        <ul><strong>Ingredients:</strong>
        {props.recipeData.ingredients.map(ing => (
          <li>{ing}</li>
        ))}
        {/* {console.log(props.recipeData.ingredients)} */}
        </ul>
        <ul><strong>Instructions:</strong>
        {props.recipeData.instructions.split('. ').map(ins => (
          <li>
            {ins.replace('.','').concat('.')}
          </li>
        ))}
        {/* {console.log(props.recipeData.instructions.split('. '))} */}
        </ul>
    </div>
  )
}

export default RecipeCard;