import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { addToCartThunk } from "../store/slices/cart.slice";

const ProductsDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const productsList = useSelector((state) => state.products);
  const [productCount, setProductCount] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);

  const productDetail = productsList.find((product) => product.id == id);
  const relatedProducts = productsList.filter(
    (product) => product.category.id === productDetail.category.id
  );

  //products: id
  //cant

  const addProduct = () => {
    alert("Adding product to cart");
    const product = {
      id: id,
      quantity: productCount,
    };
    dispatch(addToCartThunk(product));
  };

  //0 = left   1 = right
  const switchImg = (direction) => {
    if(direction === 0) {
      if (imgIndex === 0) {
        setImgIndex(2)
      } else {
        setImgIndex(imgIndex-1)
      }
    } else if (direction === 1) {
      if (imgIndex === 2) {
        setImgIndex(0)
      } else {
        setImgIndex(imgIndex+1)
      }
    } else {
      console.log("Wrong direction")
    }
  }

  return (
    <div>
      <h1>Products Detail</h1>
      <p>
        Mostrando información de <b>{productDetail?.title}</b>
      </p>
      <div className="product-detail">
        <div className="product-detail-imgs">
          <Button onClick={() => switchImg(0)}>{"<"}</Button>
          <img src={productDetail?.productImgs?.[imgIndex]} />
          <Button onClick={() => switchImg(1)}>{">"}</Button>
        </div>
        <h5>Price ${productDetail?.price}</h5>
      </div>
      <div className="product-count">
        <Button
          className="me-3"
          onClick={() => setProductCount(productCount - 1)}
          disabled={productCount === 1}
        >
          -
        </Button>
        {productCount}
        <Button
          className="ms-3"
          onClick={() => setProductCount(productCount + 1)}
        >
          +
        </Button>
      </div>
      <Button className="add-to-cart-btn" onClick={addProduct}>
        Add to Cart
      </Button>
      <h2 className="related-products-title">Related Products</h2>
      <ul className="related-products-list">
        {relatedProducts.map((product) => (
          <li key={product.id}>
            <img src={product.productImgs[0]} alt="" />
            <Link to={`/products/${product.id}`}> {product.title} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsDetail;
