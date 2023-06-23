import React from 'react'
import Sidebar from '../components/Sidebar.jsx';
import RecipeContainer from './RecipeContainer.jsx';
import { Link } from 'react-router-dom';

function FavoriteListContainer({ loggedIn }) {
  // useEffect(() => {
  //   if (props.search.length === 0) return;
  //   fetch(`https://api.api-ninjas.com/v1/cocktail?ingredients=${props.search}`, options)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('data: ', data)
  //       setData(data);
  //     })
  //     .catch(err => {
  //       console.log('Error: ', err);
  //     })
    
  // }, [props.search]);
  // if logged in, return list of favourites
  if (loggedIn) {
    // get favorites
    fetch('/favorites/getFavorites/40')
      .then(response => response.json())
      .then(data => {
        console.log('favorites data: ', data);
      })
      .catch(err => console.log('Error in fetching favorites: ', err))

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
