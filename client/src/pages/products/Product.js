import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ContextState } from '../../context/AuthContext';

const Product = ({ product }) => {
  const {
    cartState: { cart },
    dispatch,
  } = ContextState();

  // console.log(cart);

  return (
    <div>
      {cart.some((p) => p._id === product._id) ? (
        <Button
          onClick={() => {
            dispatch({
              type: 'REMOVE_FROM_CART',
              payload: product,
            });
          }}
          variant="danger"
        >
          Remove from cart
        </Button>
      ) : (
        <Button
          onClick={() => {
            dispatch({
              type: 'ADD_TO_CART',
              payload: product,
            });
          }}
          disabled={!product.inStock}
        >
          {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      )}
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <button>
        <Link to={`/product/${product._id}`}>Buy</Link>
      </button>
    </div>
  );
};

export default Product;
