import React, { useState, useEffect } from 'react';
// custom tools
import apiHandler from "../api/APIHandler";
import CardArtist from "../components/card/CardArtist";
import List from "../components/List";
// styles
import "../styles/card.css";

export default function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {

      apiHandler.get("/artists")
        .then(apiRes => {
          setArtists(apiRes.data.artists);
        })
        .catch(err =>
          console.error(err))
 
  }, []);


  return (
    <React.Fragment>
      <h1 className="title">All artists</h1>
      <List
        data={artists}
        Component={CardArtist}
        cssList="cards"
        cssItem="card artist"
      />
    </React.Fragment>
  )
}
