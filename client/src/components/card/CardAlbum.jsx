import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  return (
    <React.Fragment>
      <IconFav resourceId={data._id} resourceType="albums" isAlreadyFavorite={data.isFavorite} />
      <Link to={`/albums/${data._id}`}>
        <h3 className="title small">{data.title}</h3>
        <img className="cover" src={data.cover} alt="cover" />
      </Link>
    </React.Fragment>
  );
}
