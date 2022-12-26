import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleClose as closeCart} from "../store/slices/show.slice";
import { useDispatch } from "react-redux";

const CheckoutModal = ({ getProductImg }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handlePurchase = () => {
    setShow(false);
    navigate("./purchase")
    dispatch(closeCart());
  }

  const cartProducts = useSelector((state) => state.cart);

  return (
    <>
      <>
        <Button variant="secondary" className="btn btn-dark" onClick={handleShow}>
          Checkout
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>CHECKOUT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="checkout-container">
              <h3>Products:</h3>
              <ul className="checkout-product-list">
                {cartProducts.map((product) => (
                  <li key={product.id}>
                    <img src={getProductImg(product.id)} alt="" />
                    <div className="checkout-product-info">
                      <p>{product.title}</p>
                      <p>${product.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn btn-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className="btn btn-success" onClick={handlePurchase}>
              Purchase
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default CheckoutModal;
