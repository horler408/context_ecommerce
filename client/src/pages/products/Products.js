import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Product from './Product';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/products');
        setProducts(data.products);
        console.log(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  console.log(products);

  return (
    <div>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
