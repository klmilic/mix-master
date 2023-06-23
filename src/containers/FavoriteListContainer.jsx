import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar.jsx';
import RecipeContainer from './RecipeContainer.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import { Link } from 'react-router-dom';

function FavoriteListContainer({ loggedIn }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': 'bjNaFkpXClb//EUxueIp4g==p0lMVx6Vc1wHf5JL'
    }
  }

  const favoritesArray = [];

  useEffect(() => {
    if(favorites) return;
    // get favorites
    fetch('/favorites/getFavorites')
      .then(response => response.json())
      .then(data => {
        // console.log('favorites data: ', data);
        for (let i = 0; i < data[0].favourites.length; i++) {
          fetch(`https://api.api-ninjas.com/v1/cocktail?name=${data[0].favourites[i]}`, options)
            .then(response => response.json())
            .then(data => {
              // append card component to array
              favoritesArray.push(<RecipeCard recipeData={data}></RecipeCard>)
            })
        }
        setFavorites(favoritesArray);
        setIsLoading(false);
        // console.log('favorites array : ', favoritesArray);
      })
      .catch(err => console.log('Error in fetching favorites: ', err))
  });

  // if logged in, return list of favourites
  if (loggedIn) {

    {isLoading ? <div></div> : <div></div>}
    return (
      <div className='favContainer'>
        {/* <div>MainContainer</div> */}
        <Sidebar></Sidebar>
        <div>
          <h2>My Favorites</h2>
        </div>
        <div id="recipe-container">
          {favoritesArray}
        </div>
      </div>
    )
  }

  else return(
    <div className='favContainer'>
        {/* <div>MainContainer</div> */}
        <Sidebar></Sidebar>
        <div id="favorites">
          <h2>Sign up or login to view and save your favorite cocktail recipes!</h2>
          <div class="btnContainer">
            <Link to='/login'>
              <button>Login</button>
            </Link>
            <Link to='/signup'>
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
  )

  // if not logged in, prompt to go to login page
}

export default FavoriteListContainer;
