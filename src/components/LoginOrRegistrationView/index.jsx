import React from "react";
import Login from "../LoginOrRegisterForm";
import { IoMdArrowRoundBack } from "react-icons/io";
import style from "../../style.module.css";
export default function Index({
  error,
  authenticateHandler,
  goBackHandler,
  mode,
}) {
  return (
    <div>
      <IoMdArrowRoundBack onClick={goBackHandler} className={style.backicon} />
      <Login
        mode={mode}
        error={error}
        authenticateHandler={authenticateHandler}
      />
    </div>
  );
}
