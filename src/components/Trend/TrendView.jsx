import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import style from "../../style.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
export default function TrendView({ handleClose, topTwitts, selectHandler }) {
  return (
    <div className={style.trendposition}>
      <div className="text-center">
        <IoIosAddCircle
          className={`display-2 text-info ${style.iconpointer}`}
          onClick={handleClose}
        />
      </div>
      <h3 className="fw-bold m-0 p-2  border-start border-5 border-warning  bg-info text-dark text-center">
        Trends for you
      </h3>
      <ListGroup>
        {topTwitts.map((x) => {
          let [twittName, total] = x;
          return (
            <ListGroupItem
              className="text-info"
              key={uuidv4()}
              onClick={() => selectHandler(twittName)}
            >
              <div className="d-flex justify-content-between">
                <p className={style.listitem}> {twittName}</p>
                <small>
                  {total} <BsTwitter />
                </small>
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
