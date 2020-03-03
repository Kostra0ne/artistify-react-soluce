import React, { useState, useEffect } from "react";
// custom tools
import { useAuth } from "../auth/useAuth";
import apiHandler from "./../api/APIHandler";
import Discography from "./../components/Discography";
import Comments from "../components/comment/Comments";
// import List from "../components/List";
import Stars from "../components/star/Stars";
// styles
import "./../styles/artist.css";
import "./../styles/comment.css";
import "./../styles/star.css";

export default function Artist({ match }) {
  const { currentUser, isLoading } = useAuth();
  const [{ artist, albums, avgRate, userRate }, setState] = useState(
    {
      artist: null,
      albums: [],
      avgRate: null,
      userRate: null
    }
  );

  useEffect(() => {
    apiHandler.get(`/artists/${match.params.id}`)
      .then(apiRes => setState({ artist: apiRes.data.artist, albums: apiRes.data.albums }))
      .catch(apiErr => console.error(apiErr));
  }, []);

  // get the avg rate for this artist
  useEffect(() => {
    apiHandler.get(`/rates/artists/${match.params.id}`)
      .then(apiRes => setState((prevValue) => ({ ...prevValue, avgRate: apiRes.data.avgRate })))
      .catch(apiErr => console.error(apiErr));
  }, [userRate]);

  // get the loggedin user's rate for this artist
  useEffect(() => {
    if (!isLoading && currentUser && Object.keys(currentUser).length && !userRate) {
      apiHandler.get(`/rates/artists/${match.params.id}/users/${currentUser._id}`)
        .then(apiRes => setState((prevValue) => ({ ...prevValue, userRate: apiRes.data.userRate })))
        .catch(apiErr => console.error(apiErr));
    }
  }, [currentUser, userRate]);

  const updateUserRate = (rate) => {
    apiHandler.patch(`/rates/artists/${match.params.id}`, { rate })
      .then(() => setState((prevValue) => ({ ...prevValue, userRate: rate })))
      .catch(apiErr => console.error(apiErr))
  };

  return (
    (artist && albums) ? <div className="page artist">
      <h1 className="title">{artist.name}</h1>

      <div className="all-stars">
        <Stars avgRate={avgRate} title="Average rate" />
        {(currentUser && !isLoading) && <Stars clbk={updateUserRate} avgRate={userRate} css="user" title="My rate" />}
      </div>

      <div className="description">
        <p>music style: {artist.style.name}</p>
        <p>{artist.description}</p>
      </div>

      <Comments resourceType="artists" />

      <Discography albums={albums} />
    </div> :
      <p>loading...</p>
  );
}
