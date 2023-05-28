import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { Context } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Admin = () => {
  const authContext = useContext(Context);
  const [users, setUsers] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get('/users');
        console.log(data);
        setUsers(data);
      } catch (error) {}
    };

    getUsers();
  }, []);

  return (
    <div>
      Home
      <h1>Welcome Home</h1>
      <p>{!users ? 'Loading...' : users.map((user) => user.email)}</p>
      <div>
        {/* <Link>Sign up</Link> */}
        {/* <Link to={authContext.isAuthenticated() ? '/dashboard' : '/login'}> */}
        Login
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Admin;
