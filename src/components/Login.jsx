import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login ({ setLoggedIn }) {
    const username = useRef();
    const password = useRef();
    let navigate = useNavigate();

    const handleClick = async e => {
        fetch('/api/login', {
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
                    alert('Wrong username or password');
                }
            })
            .catch(err => console.log(err))

        // const token = await loginUser({
        //     username,
        //     password
        // });
        // props.setLoggedIn(token);
    }

    return(
    <div className='loginPage'>
        <h2>Login to Mix Master</h2>
        <input ref={username} id='usernameInput' placeholder='Username'></input>
        <input ref={password} type="password" name="password" placeholder='Password'></input>
        <button onClick={handleClick}>Login</button>
        <div>
            <span>Don't have an account?   </span>
            <Link to="/signup">
                <a>Sign Up</a>
            </Link> 
        </div>
    </div>
    )
}

export default Login;