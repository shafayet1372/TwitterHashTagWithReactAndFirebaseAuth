import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Index({ mode, authenticateHandler, error }) {
  let [values, setValues] = useState({ email: "", password: "" });

  let changeHandle = (e) => {
    setValues((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  let submitHandle = (e) => {
    e.preventDefault();
    authenticateHandler(values);
  };

  let disableHandler = () => {
    if (Object.values(values).some((x) => !x)) {
      return true;
    }
    return false;
  };

  return (
    <Form onSubmit={submitHandle}>
      {error && <p className="text-danger text-center">{error}</p>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={values.email}
          onChange={changeHandle}
          name="email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={changeHandle}
          name="password"
        />
      </Form.Group>

      <Form.Group className="d-flex justify-content-center ">
        <Button
          variant={mode == "login" ? "primary" : "warning"}
          type="submit"
          disabled={disableHandler()}
        >
          {mode == "login" ? "Login" : "Register"}
        </Button>
      </Form.Group>
    </Form>
  );
}
