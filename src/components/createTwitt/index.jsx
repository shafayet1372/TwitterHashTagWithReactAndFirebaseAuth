import db from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import React, { useState, useContext, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { errorHandlerTwitts } from "../../js";
import style from "../../style.module.css";
import context from "../../context";
import TwittSuggestionsView from "../TwittSuggestionView";
export default function Index({ handleClose }) {
  let [post, setPost] = useState("");
  let [error, setError] = useState("");
  let [twiitSuggestions, setTwiitSuggestions] = useState([]);
  let [caretPosition, setCareposition] = useState(null);
  let [caretEndPosition, setCaretEndposition] = useState(null);
  let refs = useRef();
  useEffect(() => {
    if (caretEndPosition) {
      refs.current.focus();

      refs.current.setSelectionRange(caretEndPosition, caretEndPosition + 1);
    }
  }, [caretEndPosition]);
  let allTwits = useContext(context);

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
  let getTwittSuggestion = (data, value) => {
    let searchTwit = value.match(/#[\w]+$/gi);
    let getallTwitt = data.filter((x) =>
      new RegExp(`${searchTwit}`, "i").test(x[0])
    );
    //
    return getallTwitt;
  };
  let twittSuggestionsView = (e) => {
    let caretPosition = e.target.selectionStart;
    let value = e.target.value.slice(0, caretPosition);
    if (/#[\w]{2}$|#[\w]{2,}$/i.test(value)) {
      let getTwitts = getTwittSuggestion(allTwits, e.target.value);
      setTwiitSuggestions((p) => [...getTwitts]);
      setCareposition(caretPosition);
    } else {
      setTwiitSuggestions([]);
    }
  };

  let SelectTwittHandler = (value) => {
    let getSpecificTag = post.slice(0, caretPosition).match(/#[\w]+$/)[0];
    let index = caretPosition - getSpecificTag.length;

    setPost(
      post.replace(new RegExp(`${getSpecificTag}`, "ig"), (s, i) => {
        if (i == index) {
          return value;
        }
        return s;
      })
    );
    // setCareposition(null);
    setCaretEndposition(index + value.length);
    setTwiitSuggestions([]);
  };
  return (
    <Form>
      <div className="d-flex">
        <Form.Group
          className={`${style.textarea} mb-3`}
          controlId="exampleForm.ControlTextarea1  "
        >
          <Form.Control
            as="textarea"
            rows={6}
            value={post}
            onChange={changeHandler}
            onKeyUp={twittSuggestionsView}
            ref={refs}
          />
          {error && <p className="text-danger">{error}</p>}
        </Form.Group>
        <TwittSuggestionsView
          twiitSuggestions={twiitSuggestions}
          SelectTwittHandler={SelectTwittHandler}
        />
      </div>
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
