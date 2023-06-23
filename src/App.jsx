import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Redirect } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx';
import FavoriteListContainer from './containers/FavoriteListContainer.jsx';

function App () {
  const [loggedIn, setLoggedIn] = useState(false);


  // if (loggedIn === false) {
  //   return (
  //     <Login />
  //   )
  // }

  // useEffect(() => {
  //   if (loggedIn === false) {
  //     navigate('/login');
  //   }
  // }, [loggedIn, navigate]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
        <Route path="/" element={<div id='app'><MainContainer /></div>} />
        <Route path="/search" element={<div id='app'><MainContainer /></div>} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn}/>} /> 
        <Route path="/favorites" element={<div id="app"><FavoriteListContainer loggedIn={loggedIn}/></div>} /> 
      </Routes>
    </Router>
  );
}

export default App;
