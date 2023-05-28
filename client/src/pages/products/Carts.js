import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { CartContext } from '../../context/CartContext';

const Carts = () => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const { cartItem } = cartContext.cartState;
  console.log(cartItem);

  // const total = cartItem
  //   .reduce((acc, item) => acc + item.qty * item.price, 0)
  //   .toFixed(2);

  // useEffect(() => {
  //   const getCart = async () => {
  //     try {
  //       const { data } = await axios.get(`/products/${id}`);
  //       const cart = {
  //         product: data._id,
  //         name: data.name,
  //         image: data.image,
  //         price: data.price,
  //         countInStock: data.countInStock,
  //         qty,
  //       };
  //       setPayload(cart);
  //     } catch (error) {}
  //   };
  //   getCart();
  // }, [id, qty]);

  const removeFromCartHandler = (id) => {
    return {
      ...cartItem,
      cartItems: cartItem.find((item) => item.product !== id),
    };
  };

  const shippingAddress = (data) => {
    return {
      ...cartContext.cartState,
      shippingAddress: data,
    };
  };
  const paymentMethod = (data) => {
    return {
      ...cartContext.cartState,
      paymentMethod: data,
    };
  };

  const clearCartItems = () => {
    return {
      ...cartContext.cartState,
      cartItem: [],
    };
  };

  const checkOutHandler = () => {
    navigate('/login?redirect=shipping');
  };
  return (
    <>
      <div className="cart-container">
        {cartItem.length === 0 ? (
          <div>
            Cart Empty
            <Link to="/products">Shop Now</Link>
          </div>
        ) : (
          <>
            <div>
              Total Cart Products
              <Link>{cartItem.length}</Link>
            </div>
            {/* CartItem */}
            {cartItem?.map((item) => (
              <div className="cart-item row">
                <div
                  onClick={() => removeFromCartHandler(item._id)}
                  className="remove-button"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="">
                  <Link to={`/products/${item._id}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
              </div>
            ))}

            {/* End of cart items */}
            <div className="total">
              <span className="sub-total">total:</span>
              <span className="total-price">total</span>
            </div>
            <hr />
            <div className="">
              <Link to="/" className="">
                <button>Continue To Shopping</button>
              </Link>

              {/* {total > 0 && (
                <div className="">
                  <button onClick={checkOutHandler}>Checkout</button>
                </div>
              )} */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Carts;
