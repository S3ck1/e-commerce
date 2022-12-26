import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post(`https://e-commerce-api.academlo.tech/api/v1/users/login`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("Credenciales inválidas");
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(submit)}>
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
        <Button variant="primary" type="submit" className="btn btn-dark">
          Submit
        </Button>
      </Form>

      <div style={{ marginTop: "25px" }}>
        Don't have an account? <Link to={`/register/`}>Sign Up</Link>
      </div>
    </motion.div>
  );
};

export default Login;
