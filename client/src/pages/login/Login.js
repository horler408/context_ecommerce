import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import Loading from '../../conponents/commons/Loading';
import { Context } from '../../context/AuthContext';
import ErrorMessage from '../../conponents/commons/ErrorMessage';

const Login = () => {
  const authContext = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  // const [authInfo, setAuthInfo] = useState({});

  const authenticate = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await axios.post('/users/login', credentials);
      console.table(data);
      authContext.setAuthState(data);
      setLoginSuccess(data.message);
      setLoginError('');
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 1000);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess(null);
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (true) {
      const values = { email, password };
      authenticate(values);

      setEmail('');
      setPassword('');
    }
  };
  return (
    <>
      {redirectOnLogin && <Navigate to="/dashboard" />}
      {loginLoading ? <Loading /> : loginSuccess}
      {loginError ? <ErrorMessage /> : loginError}
      <form onSubmit={loginHandler}>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
