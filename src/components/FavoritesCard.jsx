import React, { useState } from 'react';

function FavoritesCard(props) {
  return (
    <div className='recipe-card'>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <h2>{props.recipeData.name}</h2> 
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

export default FavoritesCard;