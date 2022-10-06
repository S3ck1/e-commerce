import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const CheckoutModal = ({ getProductImg }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cartProducts = useSelector((state) => state.cart);

  return (
    <>
      <>
        <Button variant="primary" onClick={handleShow}>
          Checkout
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="checkout-container">
              <h1>Checkout</h1>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default CheckoutModal;
