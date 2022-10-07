import React, { useEffect } from "react";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../store/slices/show.slice";
import {
  getCartProductsThunk,
  removeProductThunk,
} from "../store/slices/cart.slice";
import { Link, useNavigate } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";

const Cart = ({ getProductImg }) => {
  const show = useSelector((state) => state.show);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartProductsThunk());
  }, []);

  const removeProduct = (product) => {
    dispatch(removeProductThunk(product.id));
  };

  return (
    <Offcanvas
      show={show}
      onHide={() => dispatch(handleClose())}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>My Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <ListGroup>
        {cartProducts.map((product) => (
          <ListGroup.Item className="cart-item" key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
            <div className="cart-product-info"></div>
            <Button size="sm" onClick={() => removeProduct(product)}>
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Offcanvas.Body></Offcanvas.Body>
      <CheckoutModal getProductImg={getProductImg} />
    </Offcanvas>
  );
};

export default Cart;
