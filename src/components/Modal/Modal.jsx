import React, { useEffect, useState } from "react";
import Register from "../LoginOrRegisterForm";
import CreateTwitt from "../createTwitt";
import Instructions from "../Instructions";
import LoginView from "../LoginOrRegistrationView";
import ReistrationView from "../LoginOrRegistrationView";
import { Modal } from "react-bootstrap";

export default function ModalView({
  show,
  handleClose,
  loginHandler,
  registerHandler,
  userauth,
  error,
  errorHandler,
}) {
  let [mode, setMode] = useState(null);
  useEffect(() => {
    if (!userauth) {
      goBackHandler();
    }
  }, [userauth]);

  let changeModeHandler = (value) => {
    setMode(value);
  };

  let goBackHandler = () => {
    setMode(null);
    errorHandler();
  };

  let authenticateHandler = (values) => {
    if (mode == "login") {
      loginHandler(values);
    } else if (mode == "register") {
      registerHandler(values);
    }
  };

  let showModalContent = () => {
    if (userauth) {
      return <CreateTwitt handleClose={handleClose} />;
    } else {
      if (mode == "login") {
        return (
          <LoginView
            error={error}
            authenticateHandler={authenticateHandler}
            goBackHandler={goBackHandler}
            mode="login"
          />
        );
      } else if (mode == "register") {
        return (
          <ReistrationView
            error={error}
            authenticateHandler={authenticateHandler}
            goBackHandler={goBackHandler}
            mode="register"
          />
        );
      } else {
        return <Instructions changeModeHandler={changeModeHandler} />;
      }
    }
  };
  return (
    <Modal show={show} onHide={handleClose} style={{ margin: "0px" }}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body style={{ minHeight: "300px " }}>
        {showModalContent()}
      </Modal.Body>
    </Modal>
  );
}
