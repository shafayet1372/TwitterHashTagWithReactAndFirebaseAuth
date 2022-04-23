import db from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { errorHandlerTwitts } from "../../js";
export default function Index({ handleClose }) {
  let [post, setPost] = useState("");
  let [error, setError] = useState("");
  let collections = collection(db, "twitterposts");

  let errorHandler = () => {
    return errorHandlerTwitts(post);
  };

  let addTwitt = async () => {
    try {
      await addDoc(collections, { post, time: new Date().toISOString() });
    } catch (e) {}
  };

  let createTwittHandler = () => {
    let { hasError, error } = errorHandler();
    if (!hasError) {
      addTwitt();
      handleClose();
    } else {
      setError(error);
    }
  };

  let changeHandler = (e) => {
    setPost(e.target.value);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label></Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={post}
          onChange={changeHandler}
        />
        {error && <p className="text-danger">{error}</p>}
      </Form.Group>

      <Button
        variant="info"
        className="text-white"
        onClick={createTwittHandler}
      >
        create Twitt
      </Button>
    </Form>
  );
}
