import React from "react";
import { v4 as uuidv4 } from "uuid";
import { BsTwitter } from "react-icons/bs";
import style from "../../style.module.css";
export default function Index({ twiitSuggestions, SelectTwittHandler }) {
  return (
    <div className={style.suggestion_box}>
      <div className={style.inner_suggestion_box}>
        <ul className="overflow-auto list-unstyled">
          {[...new Set(twiitSuggestions)].map((x) => (
            <li
              className={`${style.suggestion_list} text-white bg-info my-1 d-flex justify-content-between`}
              key={uuidv4()}
              onClick={() => SelectTwittHandler(x[0])}
            >
              <p className="m-0">{x[0]}</p>
              <small>
                ({x[1]})<BsTwitter />
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
