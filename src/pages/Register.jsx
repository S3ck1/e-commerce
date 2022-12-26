import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    data["phone"] = "1234567890";
    data["role"] = "admin";
    console.log(data)
    axios
      .post(`https://e-commerce-api.academlo.tech/api/v1/users`, data)
      .catch((error) => {
        if (error.response?.status === 404) {
          alert(error.response?.message);
        }
      })
      .then(() => navigate("/login"))
      .then(() => alert("User successfully created!"))
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formPlainText">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            {...register("firstName")}
            type="text"
            placeholder="Enter first name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPlainText">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            {...register("lastName")}
            type="text"
            placeholder="Enter last name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit" className="btn btn-dark">
          Submit
        </Button>
      </Form>
      <div style={{ marginTop: "25px" }}>
        Have an account? <Link to={`/products/`}>Sign In</Link>
      </div>
    </div>
  );
};

export default Register;
