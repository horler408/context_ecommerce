import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api');
      const data = await response.data;
      console.log(data);
      setData(data.message);
    };

    fetchData();
  }, []);
  return (
    <div>
      Home
      <h1>Welcome Home</h1>
      <p>{!data ? 'Loading...' : data}</p>
    </div>
  );
};

export default Home;
