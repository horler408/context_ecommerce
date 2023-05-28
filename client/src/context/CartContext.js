import React, { useState, createContext } from 'react';

const CartContext = createContext();
const { Provider } = CartContext;

const CartProvider = ({ children }) => {
  const cartItem = localStorage.getItem('cartItem');
  const shippingAddress = localStorage.getItem('shippingAddress');
  const paymentMethod = localStorage.getItem('paymentMethod');

  const [cartState, setCartState] = useState({
    cartItem: cartItem ? JSON.parse(cartItem) : [],
    // shippingAddress: shippingAddress ? JSON.parse(shippingAddress) : {},
    // paymentMethod: paymentMethod ? JSON.parse(paymentMethod) : {},
  });

  const setCartInfo = ({ cartItems, shippingAddress, paymentMethod }) => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));

    setCartState({ cartItems, shippingAddress, paymentMethod });
  };

  const clearCartItems = () => {
    localStorage.removeItem('cartItem');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    setCartState({ cartItems: [], paymentMethod: {}, shippingAddress: {} });
  };
  return (
    <div>
      <Provider
        value={{
          cartState,
          setCartState: (cartInfo) => setCartInfo(cartInfo),
          clearCartItems,
        }}
      >
        {children}
      </Provider>
    </div>
  );
};

export { CartContext, CartProvider };
