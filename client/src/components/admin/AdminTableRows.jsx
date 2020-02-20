import React from "react";
import { Link } from "react-router-dom";
// custom tools
import FormatDate from "./../FormatDate";

export const RowArtist = ({ data }) => {
  const avg = data.avg ? data.avg.toFixed(2) : null;
  return <React.Fragment>
    <td>
      <Link className="link" to={`/artists/${data._id}`}>
        {data.name}
      </Link>
    </td>
    <td>{data.style ? data.style.name : "no style yet"}</td>
    <td>{avg || "unrated"}</td>
  </React.Fragment>
};

export const RowAlbum = ({ data }) => (
  <React.Fragment>
    <td>
      <Link className="link" to={`/albums/${data._id}`}>
        {data.title}
      </Link>
    </td>
    <td>
      <FormatDate date={data.releaseDate} />
    </td>
    <td>{data.avg || "unrated"}</td>
    <td>{data.label && data.label.name}</td>
  </React.Fragment>
);

export const RowLabel = ({ data }) => (
  <React.Fragment>
    <td>
      <Link className="link" to={`/labels/${data._id}`}>
        {data.name}
      </Link>
    </td>
    <td>{data.country}</td>
    <td>{data.city}</td>
  </React.Fragment>
);

export const RowStyle = ({ data }) => (
  <React.Fragment>
    <td>
      <Link className="link" to={`/styles/${data._id}`}>
        {data.name}
      </Link>
    </td>
    <td className="color-box">
      <div
        className="icon-color"
        style={{ background: data.color || "black" }}
      ></div>
    </td>
  </React.Fragment>
);

export const getTableRowsTemplate = (endpoint, deleteClbk, editClbk) => {
  const rowTemplate = {
    artists: RowArtist,
    labels: RowLabel,
    albums: RowAlbum,
    styles: RowStyle
  }[endpoint];

  return rowTemplate;
};
