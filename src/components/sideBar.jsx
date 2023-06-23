import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div id='sideBar'>
      <div className='sideBarButton'>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/favorites">
          <button>Favorites</button>
        </Link>
        <img src="https://em-content.zobj.net/source/microsoft-teams/337/tropical-drink_1f379.png" width="50px"/>
      </div>
    </div>
  )
}

export default Sidebar;