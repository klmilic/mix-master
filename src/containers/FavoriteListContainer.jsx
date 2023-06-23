import React from 'react'
import Sidebar from '../components/Sidebar.jsx';
import RecipeContainer from './RecipeContainer.jsx';
import { Link } from 'react-router-dom';

function FavoriteListContainer({ loggedIn }) {
  // if logged in, return list of favourites
  if (loggedIn) {
    return (
      <div className='favContainer'>
        {/* <div>MainContainer</div> */}
        <Sidebar></Sidebar>
        <div>
          <h2>My Favorites</h2>
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
