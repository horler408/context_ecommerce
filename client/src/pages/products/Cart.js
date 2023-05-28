import React, { useEffect, useState } from 'react';
import { ContextState } from '../../context/AuthContext';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  const [total, setTotal] = useState();
  const {
    cartState: { cart },
    dispatch,
  } = ContextState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    );
  }, [cart]);

  return (
    <div>
      <div className="product-container">
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{item.name}</span>
                </Col>
                <Col md={2}>$ {item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch({
                        type: 'CHANGE_CART_QTY',
                        payload: {
                          id: item._id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(item.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: item,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal: ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ${total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
