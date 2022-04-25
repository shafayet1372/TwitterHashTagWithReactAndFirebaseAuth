import db from "../../firebase-config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import style from "../../style.module.css";
import Modal from "../Modal/Modal";
import TwittView from "../TwitView";
import TrendView from "../Trend/TrendView";
import { Button, Spinner } from "react-bootstrap";
import { TwittsTrendCount } from "../../js";
import context from "../../context";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";

const topTwittTotalShow = 5;
export default function Index() {
  let [show, setShow] = useState(false);
  let [datas, setDatas] = useState([]);
  let [selectedTwitt, setSelectedTwitt] = useState("");
  let [userauth, setAuth] = useState(false);
  let [error, setError] = useState("");
  let [mode, setMode] = useState(null);

  let auth = getAuth();
  let collections = query(
    collection(db, "twitterposts"),
    orderBy("time", "desc")
  );

  useEffect(() => {
    let unsub = onSnapshot(collections, (data) => {
      setDatas(data.docs.map((x) => ({ ...x.data(), id: x.id })));
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        console.log(user.email);
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  }, [auth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTwitt]);

  let loginHandler = async (values) => {
    let { email, password } = values;

    setPersistence(auth, browserSessionPersistence);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
    }
  };

  let registerHandler = async (values) => {
    let { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      let error = e.code;
      if (e.code == "auth/weak-password") {
        error = "Password should be at least 6 characters";
      }
      setError(error);
    }
  };

  let signOutHandler = async () => {
    try {
      await signOut(auth);
      goBackHandler();
    } catch (e) {}
  };

  let handleClose = () => {
    setShow((p) => !p);
  };

  let changeModeHandler = (value) => {
    setMode(value);
  };

  let errorHandler = () => {
    setError("");
  };
  let goBackHandler = () => {
    setError("");
    setMode("");
  };
  let topTwittsCount = () => {
    return TwittsTrendCount(datas.slice());
  };

  let selectHandler = (value) => {
    setSelectedTwitt(value);
  };

  let filterByTwitts = (data) => {
    if (selectedTwitt == "") {
      return data;
    }
    return data.filter((x) => new RegExp(`${selectedTwitt}`, "i").test(x.post));
  };

  let twittShow = () => {
    let getFilteredTwitts = filterByTwitts(datas.slice());

    return (
      <TwittView datas={getFilteredTwitts} selectHandler={selectHandler} />
    );
  };

  return (
    <div className={`container my-5  ${style.fixccontainer}`}>
      {!datas.length ? (
        <div className="row ">
          <div className="col-md-12 my-5 d-flex justify-content-center">
            <Spinner animation="grow" />
          </div>
        </div>
      ) : (
        <div>
          <div className={`row ${style.rowfix}`}>
            <div
              className={`col-md-12  d-flex justify-content-end ${style.buttonfix}`}
            >
              {userauth && (
                <Button variant="outline-danger" onClick={signOutHandler}>
                  Logout
                </Button>
              )}
            </div>
          </div>
          <div className="row">
            <div
              className={`col-sm-5 col-md-5 d-flex justify-content-center ${style.mobilefix}`}
            >
              <TrendView
                handleClose={handleClose}
                selectHandler={selectHandler}
                topTwitts={topTwittsCount().slice(0, topTwittTotalShow)}
              />
            </div>
            <div className={`col-md-7 col-sm-7 mt-5  ${style.cardview}`}>
              {twittShow()}
            </div>
          </div>
          <context.Provider value={topTwittsCount()}>
            <Modal
              show={show}
              userauth={userauth}
              loginHandler={loginHandler}
              registerHandler={registerHandler}
              handleClose={handleClose}
              error={error}
              errorHandler={errorHandler}
              mode={mode}
              changeModeHandler={changeModeHandler}
              goBackHandler={goBackHandler}
            />
          </context.Provider>
        </div>
      )}
    </div>
  );
}
