import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutModal = ({ getProductImg }) => {
	const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
		setShow(true)
		navigate("/purchase")
	};

  const cartProducts = useSelector((state) => state.cart);

  return (
    <>
      <>
        <Button variant="primary" onClick={handleShow}>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
								PURCHASE
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default CheckoutModal;
