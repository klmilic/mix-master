import React, {useState, useEffect} from 'react';
import RecipeCard from '../components/RecipeCard.jsx';

function RecipeContainer(props) {
    const [data, setData] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);

    // const apiKey = process.env.API_KEY;

    const options = {
      method: 'GET',
      headers: {
        'X-Api-Key': 'bjNaFkpXClb//EUxueIp4g==p0lMVx6Vc1wHf5JL'
      }
    }

  useEffect(() => {
    if (props.search.length === 0) return;
    fetch(`https://api.api-ninjas.com/v1/cocktail?ingredients=${props.search}`, options)
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data)
        setData(data);
      })
      .catch(err => {
        console.log('Error: ', err);
      })
    
  }, [props.search]);

    

  return (
    <div id="recipe-container">
      {/* <div>RecipeContainer</div> */}
      {data.length > 0 ? (
        <ul id="recipes">
          {data.map(item => (
            <RecipeCard recipeData={item} />
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default RecipeContainer;
