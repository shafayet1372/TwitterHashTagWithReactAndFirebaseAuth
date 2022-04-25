import React from "react";
import { Card } from "react-bootstrap";
import { BsTwitter } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import regexifyString from "regexify-string";
import ReactTimeAgo from "react-time-ago";
import style from "../../style.module.css";
export default function Index({ datas, selectHandler }) {
  let stringRegexiFy = (datas) => {
    return datas.map((x) => {
      const result = regexifyString({
        pattern: /#[\w]+/gi,
        decorator: (match, index) => {
          return (
            <span
              key={uuidv4()}
              className={`text-info fw-bold ${style.hashtagfix}`}
              onClick={() => selectHandler(match)}
            >
              {match}
            </span>
          );
        },
        input: x.post,
      });
      return { ...x, post: result };
    });
  };

  let dataShow = () => {
    let twits = stringRegexiFy(datas);
    return twits.map((x) => {
      return (
        <Card
          key={x.id}
          className={`rounded border border-info my-3 ${style.cardfix}`}
        >
          <Card.Header as="h5">
            <BsTwitter className="display-5 text-info" />
          </Card.Header>
          <Card.Body>
            <Card.Text>{x.post}</Card.Text>
          </Card.Body>
          <div className="ms-3">
            <small>
              <BiTime className={style.time} />{" "}
              <ReactTimeAgo date={new Date(x.time).getTime()} locale="en-US" />
            </small>
          </div>
        </Card>
      );
    });
  };

  return <div>{dataShow()}</div>;
}
