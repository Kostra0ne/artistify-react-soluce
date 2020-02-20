import React from "react";
import FormDate from "../FormatDate";

export default function Comment({ data }) {
  return (
    <div className="comment">
      {data.author && (
        <div className="author-infos">
          <div className="avatar">
            <img
              src={data.author.avatar}
              alt={data.author.name + "'s avatar"}
            />
          </div>
          <b className="username">{data.author.username}</b>
        </div>
      )}
      {!data.author && (
        <div className="author-infos">
          account deleted
        </div>
      )}
      <p className="message">{data.message}</p>
      <FormDate date={data.date} rule="YYYY-MM-DD HH:mm:ss" />
    </div>
  );
}
