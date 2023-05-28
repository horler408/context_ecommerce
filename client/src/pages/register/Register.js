import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../context/AuthContext';

const Register = () => {
  const authContext = useContext(Context);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  const registerUser = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await axios.post('/users/register', credentials);

      authContext.setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError('');
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 1000);
      console.log(data);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setSignupError(data.message);
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      return;
    }
    const values = { firstName, lastName, email, password };
    // console.log(values);
    registerUser(values);

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };
  return (
    <div>
      {/* {redirectOnLogin && <Redirect to="/dashboard"/>} */}
      <form onSubmit={registerHandler}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
