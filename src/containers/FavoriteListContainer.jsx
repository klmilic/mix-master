import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar.jsx';
import RecipeContainer from './RecipeContainer.jsx';
import FavoritesCard from '../components/FavoritesCard.jsx';
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
    if(favorites.length) return;
    if(!loggedIn) return;
    // get favorites
    fetch('/favorites/getFavorites')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          favoritesArray.push(<FavoritesCard recipeData={data[i]}></FavoritesCard>)
        }
        setFavorites(data);
        setIsLoading(false);
      })
      .catch(err => console.log('Error in fetching favorites: ', err))
  }, [isLoading]);

  const components = 
  <div className='favContainer'>
    {/* <div>MainContainer</div> */}
    <Sidebar></Sidebar>
    <div id="fav-container">
    <div className="flex">
      <h2>My Favorites</h2>
    </div>
    {favorites.length > 0 ? (
        <ul id="recipes">
          {favorites.map(item => (
            <FavoritesCard recipeData={item} />
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  </div>

  // if logged in, return list of favourites
  if (loggedIn) {
    if (isLoading) return <Sidebar></Sidebar>;
    else return components;
  }

  else return(
    <div className='login-container'>
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
