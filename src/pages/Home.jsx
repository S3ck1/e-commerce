import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const productsList = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://e-commerce-api.academlo.tech/api/v1/products/categories`
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setProductsFiltered(productsList);
  }, [productsList]);

  const filterCategory = (categoryID) => {
    const filtered = productsList.filter(
      (product) => product.category.id == categoryID
    );
    setProductsFiltered(filtered);
  };

  const searchProducts = () => {
    const filtered = productsList.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductsFiltered(filtered);
  };

  return (
    <div>
      <h1>Categories</h1>
      <div className="categories-nav-container">
        <Button className="btn btn-light" onClick={() => setProductsFiltered(productsList)}>
          All
        </Button>
        {categories.map((category) => (
          <Button key={category.id} className="btn btn-light" onClick={() => filterCategory(category.id)}>
            {category.name}
          </Button>
        ))}
      </div>
      <div className="search-container">
        <InputGroup
          className="mb-3 search-product"
          style={{ maxWidth: "700px", margin: "20px auto" }}
        >
          <Form.Control
            placeholder="Search Products"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button variant="outline-secondary" onClick={searchProducts}>
            Search
          </Button>
        </InputGroup>
      </div>
      <div className="products-list-container">
        <ul className="products-list">
          {productsFiltered.map((product) => (
            <li
              className="product"
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img src={product.productImgs[0]} alt="" />
              <b>{product.title}</b>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
