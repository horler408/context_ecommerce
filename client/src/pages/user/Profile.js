import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState();

  const { id } = useParams();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const getUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      };
      const { data } = await axios.get(`/users/${id}`, config);
      setUser(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (!authContext.isAuthenticated()) {
      navigate('/login');
    }

    getUser();
  });
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
};

export default Profile;
