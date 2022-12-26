import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { purchaseCartThunk } from "../store/slices/cart.slice";

const Purchase = ({ getProductImg }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (data) => {
    dispatch(purchaseCartThunk(data));
  };

  return (
    <div>
      <h1>Purchase</h1>
      <Form
        onSubmit={handleSubmit(submit)}
        style={{ maxWidth: "600px", display: "flex", flexDirection: "column", margin: "auto" }}
      >
        <Form.Group className="mb-3" style={{marginTop: "20px"}}>
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            {...register("street")}
            type="text"
            placeholder="Enter Street Address"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Colony</Form.Label>
          <Form.Control
            {...register("colony")}
            type="text"
            placeholder="Colony"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>zipCode</Form.Label>
          <Form.Control
            {...register("zipCode")}
            type="number"
            placeholder="Example: 01015"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            {...register("city")}
            type="text"
            placeholder="City name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>References</Form.Label>
          <Form.Control
            {...register("references")}
            type="text"
            placeholder="Some References"
          />
        </Form.Group>
        <Button variant="primary" className="btn btn-dark" type="submit" style={{marginTop: "50px"}}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Purchase;
