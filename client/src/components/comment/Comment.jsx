import React from "react";
import FormDate from "../FormatDate";

export default function Comment({ data }) {
  return (
    data && data.author ? <div className="comment">
      <div className="author-infos">
        <img src={data.author.avatar} alt={`${data.author.username}'s avatar`} className="icon-avatar avatar" />
        <span>{data.author.username}</span>
      </div>
      <span className="message">{data.message}</span>
      <FormDate date={data.date} />
    </div> :
      <p>loading...</p>
  );
}
