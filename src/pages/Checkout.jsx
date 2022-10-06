import React from "react";
import { useSelector } from "react-redux";

const Checkout = ({ getProductImg }) => {
  const cartProducts = useSelector((state) => state.cart);

  return (
    <div>
      <h1>Checkout</h1>
      <ul className="checkout-product-list">
        {cartProducts.map((product) => (
          <li>
            <img src={getProductImg(product.id)} alt="" />
						<div className="checkout-product-info">
							<p>{product.title}</p>
							<p>${product.price}</p>
						</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checkout;
