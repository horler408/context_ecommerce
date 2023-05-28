import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { Context } from '../../context/AuthContext';

import Orders from '../payments/Orders';
import ProfileTabs from './ProfileTabs';

const Dashboard = () => {
  const navigate = useNavigate();
  const authContext = useContext(Context);

  const { userInfo } = authContext.authState;

  useEffect(() => {
    if (!authContext.isAuthenticated()) {
      navigate('/login');
    }

    const getUser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authContext.authState.token}`,
          },
        };
        const { data } = await axios.get(
          `/users/64266639582f57d1e8b3152f`,
          config
        );
        console.log(data);
      } catch (error) {}
    };

    getUser();
  }, [navigate, authContext]);

  return (
    <div>
      <strong>{`${userInfo.firstName} ${userInfo.lastName}`}</strong>
      <Orders />
      <ProfileTabs />
      <span>Joined {moment(userInfo.createdAt).format('LL')}</span>
    </div>
  );
};

export default Dashboard;
