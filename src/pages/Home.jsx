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

  useEffect(() => {
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setProductsFiltered(productsList);
  }, [productsList]);
  

  const filterCategory = (categoryID) => {
    const filtered = productsList.filter((product) => product.category.id == categoryID)
    console.log(filtered)
    setProductsFiltered(filtered);
  }

  const searchProducts = () => {
    const filtered = productsList.filter((product) => 
    product.title.toLowerCase().includes(searchValue.toLowerCase()));
    setProductsFiltered(filtered);
  }

  return (
    <div>
     {categories.map((category) => (
        <Button key={category.id} onClick={() => filterCategory(category.id)}>{category.name}</Button>
     ))}
     <InputGroup className="mb-3 search-product">
        <Form.Control
          placeholder="Search Products"
          onChange={(e) => setSearchValue(e.target.value)}
          value = {searchValue}
        />
        <Button variant="outline-secondary" onClick={searchProducts}>
          Search
        </Button>
      </InputGroup>
      <ul className="products-list">
        {productsFiltered.map((product) => (
          <li
            className="product"
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <h3> {product.title} </h3>
            <img src={product.productImgs[0]} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
