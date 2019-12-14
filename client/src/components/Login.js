import React, { useState } from "react";
import axios from 'axios';

import { PacmanLoader } from 'react-spinners';

import './Login.css';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setCredentials({...credentials, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    axios.post('http://localhost:5000/api/login', credentials)
      .then(res=> {
        setIsLoading(false);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch(err=> console.log(err.message));
  }

  return (
      <form className='login-form'>
        <h1>Login to the Bubble App!</h1>
        <input type='text' name='username' value={credentials.username} onChange={handleInputChange} placeholder='Username' />
        <input type='password' name='password' value={credentials.password} onChange={handleInputChange} placeholder='Password' />
        <button onClick={handleSubmit}>Login</button>
        {isLoading ? <PacmanLoader color={'#36D7B7'} size={30} /> : null}
      </form>
  );
};

export default Login;
