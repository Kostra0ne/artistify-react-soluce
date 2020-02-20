import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// custom tools
import apiHandler from "../api/APIHandler";
import UserContext from "../auth/UserContext";
import Comments from "../components/comment/Comments";
import FormatDate from "../components/FormatDate";
import Stars from "../components/star/Stars";
// styles
import "../styles/album.css";
import "../styles/comment.css";
import "../styles/star.css";

export default function Album({ match }) {
  const [album, setAlbum] = useState({});
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const [userRate, setUserRate] = useState(undefined);

  const getUserRate = async () => {
    console.log(currentUser);

    const apiRes = await apiHandler.get(
      `/rates/albums/${match.params.id}/users/${currentUser._id}`
    );

    setUserRate(apiRes.data.userRate);
  };

  const getAlbum = async () => {
    const apiRes = await apiHandler.get(`/albums/${match.params.id}`);
    setAlbum(apiRes.data.album);
  };

  const updateUserRate = async evt => {
    try {
      const rate = Number(evt.currentTarget.getAttribute("data-rate"));
      await apiHandler.patch(`/rates/albums/${match.params.id}`, { rate });
      getAlbum();
      getUserRate();
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  useEffect(() => {
    try {
      getAlbum();
      if (currentUser._id) getUserRate();
    } catch (err) {
      console.error(err);
    }
  }, [currentUser]);

  return (
    <>
      <h1 className="title">D.I.Y (Album)</h1>
      <p>
        Use the image below to code the {`<Album />`} component.
        <br />
        This component import child components: {`<Stars />`} and {`<Comments />`}{" "}
      </p>

      <h1 className="title">D.I.Y (Stars)</h1>
      <p>
        The Stars component allow the end-users to rate an artist/album.
        <br />
        The black stars represent the average rate for a given resource.
        <br />
        The yellow stars represent the logged in user rate fro the current album.
        <br />
        Bonus: make it modular to rate labels/styles as well.
      </p>

      <hr />

      <h1 className="title">D.I.Y (Comments)</h1>
      <p>
        Import a custom {`<Comments />`} allowing the end-users to post comments
        in database related to the current artist.
        <br />
      </p>

      <div className="page album">
        <h1 className="title">{album.title}</h1>

        <div className="all-stars">
          <Stars avgRate={album.avg} title="average rate" />
          <Stars
            css="user"
            avgRate={userRate}
            clbk={updateUserRate}
            title="your rate"
          />
        </div>

        <img
          src={album.cover}
          alt={`cover ${album.title} `}
          className="cover"
        />

        <p className="description">
          {album.description || "no description yet"}{" "}
        </p>

        <Comments type="album" id={match.params.id} />

        <p className="publishing">
          Album by&nbsp;
          {album.artist && (
            <Link className="link" to={`/artists/${album.artist._id}`}>
              {album.artist.name}
            </Link>
          )}
          {!album.artist && <span>unknown</span>}
          {album.releaseDate && (
            <span>
              &nbsp;published the <FormatDate date={album.releaseDate} />
            </span>
          )}
          <b>{album.label && <span>&nbsp;by {album.label.name}</span>}</b>
        </p>
      </div>
    </>
  );
}
