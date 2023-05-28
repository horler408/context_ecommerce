import React from 'react';
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { ContextState } from '../context/AuthContext';

const Header = () => {
  const {
    cartState: { cart },
    dispatch,
  } = ContextState();

  // console.log(cart);
  return (
    <Navbar bg="dark" variant="dart" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a Product"
            className="m-auto"
          />
        </Navbar.Text>
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="20px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <span className="cart-item" key={item._id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-detail">
                        <span>{item.name}</span>
                        <span>$ {item.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          dispatch({
                            type: 'REMOVE_FROM_CART',
                            payload: item,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: '95%', margin: '0 10px' }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
