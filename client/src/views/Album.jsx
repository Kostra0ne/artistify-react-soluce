import React, { useEffect, useState } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import Comments from "../components/comment/Comments";
import FormatDate from "../components/FormatDate";
import Stars from "../components/star/Stars";
// styles
import "../styles/album.css";
import "../styles/comment.css";
import "../styles/star.css";
import { useAuth } from "../auth/useAuth";



export default function Album({ match }) {
  const { currentUser, isLoading } = useAuth();
  const [{ album, avgRate, userRate }, setState] = useState(
    {
      album: null,
      avgRate: null,
      userRate: null
    }
  );

  useEffect(() => {
    apiHandler.get(`/albums/${match.params.id}`)
      .then(apiRes => {
        setState(prevState => ({ ...prevState, album: apiRes.data }));
      })
      .catch(apiErr => console.error(apiErr))
  }, []);

  // get the loggedin user's rate for this artist
  useEffect(() => {
    if (!isLoading && currentUser && Object.keys(currentUser).length && !userRate) {
      apiHandler.get(`/rates/albums/${match.params.id}/users/${currentUser._id}`)
        .then(apiRes => {
          setState((prevValue) => ({ ...prevValue, userRate: apiRes.data.userRate }))
        })
        .catch(apiErr => console.error(apiErr));
    }

  }, [currentUser, userRate]);

  const updateUserRate = (rate) => {
    apiHandler.patch(`/rates/albums/${match.params.id}`, { rate })
      .then(() => setState((prevValue) => ({ ...prevValue, userRate: rate })))
      .catch(apiErr => console.error(apiErr))
  };

  return (
    album ? <div className="page album">
      <h1 className="title">{album.title}</h1>
      <div className="all-stars">
        <Stars avgRate={avgRate} title="Average rate" />
        {(currentUser && !isLoading) && <Stars clbk={updateUserRate} avgRate={userRate} css="user" title="My rate" />}
      </div>
      <img src={album.cover} alt={`cover of ${album.title} by ${album.artist.name}`} className="cover" />
      <p className="description">{album.description}</p>
      <p className="publishing">Album by {album.artist.name} published the <FormatDate /> by {album.label.name}</p>
      <Comments resourceType="albums" />
    </div> : <p>loading...</p>
  );
}
