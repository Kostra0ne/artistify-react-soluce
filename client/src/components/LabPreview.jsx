import React from "react";

import album from "../assets/img/previews/album.screen.png";
import albumForm from "../assets/img/previews/album.form.screen.png";
import albums from "../assets/img/previews/albums.screen.png";
import artist from "../assets/img/previews/artist.screen.png";
import artistForm from "../assets/img/previews/artist.form.screen.png";
import artists from "../assets/img/previews/artists.screen.png";

const previews = {
  album,
  albumForm,
  albums,
  artist,
  artistForm,
  artists
};

export default function LabPreview({ name, isSmall }) {
  return (
    <div className="lab-preview">
      <h1 className="title diy">Image Preview =></h1>
      <img
        src={previews[name]}
        alt="lab preview"
        style={{ display: "block", width: isSmall ? "50%" : "100%" }}
      />
    </div>
  );
}
