import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import { handleShow } from "../store/slices/show.slice";

const MyNavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  const dispatch = useDispatch();

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand to="/" as={Link}>
            NextKey Store
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/purchases">
              Purchases
            </Nav.Link>
            <Nav.Link onClick={() => dispatch(handleShow())}>Cart</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavBar;
