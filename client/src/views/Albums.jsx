import React, { useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import CardAlbum from "../components/card/CardAlbum";
import List from "../components/List";

// styles
import "../styles/card.css";

export default function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    apiHandler.get("/albums")
      .then(apiRes => setAlbums(apiRes.data.albums))
      .catch(apiErr => console.error(apiErr));
  }, []);

  return (
    <React.Fragment>
      <h1 className="title">All albums</h1>
      <hr></hr>
      <List
        data={albums}
        Component={CardAlbum}
        cssList="cards"
        cssItem="card album"
      />
    </React.Fragment>
  );
}
