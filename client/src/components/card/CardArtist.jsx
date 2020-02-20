import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  return (
    <>
      <IconFav
        isAlreadyFavorite={data.isFavorite}
        resourceId={data._id}
        resourceType="artists"
      />

      <Link to={`/artists/${data._id}`} className="link">
        {data.style && data.style.color && (
          <div
            className="style color"
            style={{ background: data.style.color }}
          ></div>
        )}
        <h3 className="title small">{data.name}</h3>
      </Link>
    </>
  );
}
