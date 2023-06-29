import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup ({ setLoggedIn }) {
  const username = useRef();
  const password = useRef();
  let navigate = useNavigate();

  const signupFunc = () => {

    if (username.current.value === '' || password.current.value === '') {
      alert('Username and password fields must not be empty.');
      return;
    }

    fetch('/api/signup', {
			method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data === true) {
          navigate('/');
          setLoggedIn(true);
        }
        else {
          alert('Username already taken - please enter a new one.');
        }
      })
      .catch(err => console.log('Error in sign up: ', err))
  }

    return(
    <div className='signupPage'>
        <h2>Create a new account</h2>
        <input ref={username} placeholder='Username' required></input>
        <input type="password" ref={password} placeholder='Password' required></input>
        <button onClick={signupFunc}>Sign Up</button>
        <div> 
          <span>Already have an account?   </span>
          <Link to="/login">
                  <a>Login</a>
          </Link> 
        </div>
    </div>
    )
}

export default Signup;