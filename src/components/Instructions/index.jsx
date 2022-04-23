import React from "react";
import { Button } from "react-bootstrap";
export default function Index({ changeModeHandler }) {
  return (
    <div>
      <p className="text-info ">To create twitt you have to be Logged In</p>
      <p className="text-danger">
        If you dont have any account please Regsiter!
        <br />
        If you are registered user please Log In!
      </p>
      <div className="d-flex justify-content-center mt-5">
        <div>
          <Button
            className="btn-info fw-bold "
            onClick={() => changeModeHandler("login")}
          >
            Log In
          </Button>
        </div>
        <div className="ms-3">
          <Button
            className="btn-warning text-dark fw-bold"
            onClick={() => changeModeHandler("register")}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
