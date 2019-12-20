import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    isFetching: false
  })

  const login = (event) => {
    event.preventDefault();
    setCredentials({
      isFetching: true
    })
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input
          type='text'
          name='username'
          placeholder='username'
          value={credentials.username}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          value={credentials.password}
        />
        <button>Log in</button>
        {credentials.isFetching && 'logging in'}
      </form>
    </div>
  );
};

export default Login;