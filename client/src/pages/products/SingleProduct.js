import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { CartContext } from '../../context/CartContext';

const SingleProduct = () => {
  const cartContext = useContext(CartContext);
  const { id } = useParams();

  const [payload, setPayload] = useState({});
  const { cartItem } = cartContext.cartState;
  console.log(cartItem);

  const [item, setItem] = useState({});
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3001/api/products/${id}`
        );
        setItem(data.data);
        // cartContext.setCartState(data.data);
        console.log(data.data);
        setPayload(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleProduct();
  }, [id]);

  const addToCartHandler = () => {
    const existItem = cartItem.find((x) => x.product === payload);
    if (existItem) {
      return {
        ...cartItem,
        cartItems: cartItem.map((x) =>
          x.product === existItem.product ? payload : x
        ),
      };
    } else {
      return {
        ...cartItem,
        cartItems: [...cartItem, payload],
      };
    }
  };

  const removeFromCartHandler = (id) => {
    return {
      ...cartItem,
      cartItems: cartItem.find((item) => item.product !== id),
    };
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} />
      <p>{item.description}</p>
      <div className="">
        <h6>QUANTTY</h6>
        <select value={item.qty} onChange={(e) => addToCartHandler()}>
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <h6>PRICE</h6>
        <h4>${item.price}</h4>
      </div>

      <button onClick={addToCartHandler}>Add to cart</button>

      <button>
        <Link to={`/carts/${id}`}>Go to cart</Link>
      </button>
    </div>
  );
};

export default SingleProduct;
