import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
//custom tools
import { useAuth } from "../../auth/useAuth";
import APIHandler from "../../api/APIHandler";
// styles

export default function UserFavorites() {
  const [favorites, setFavorites] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("fx");

    if (favorites.artists && favorites.albums) setIsLoading(false);
  }, [favorites]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const apiRes = await APIHandler.get(
          `/users/${currentUser._id}/favorites`
        );
        setFavorites(apiRes.data);
      } catch (apiErr) {
        console.error(apiErr);
      }
    };
    getFavorites();
  }, []);

  return isLoading ? null : (
    <>
      <div className="DIY">
        <h1 className="title">D.I.Y</h1>
        <p>
          Fetch currentUser's favorites with axios.
          <br />
          Update the rendered template to display them.
          <br />
          It would be better to create a dedicated component.
        </p>
      </div>
      <div className="user-favorites">
        <h1 className="title medium">
          My favorites <FontAwesomeIcon size="xs" icon={faHeart} />
        </h1>
        <div className="artists">
          <h2 className="title small">Artists</h2>
          {!favorites.artists.length && <p>Sorry, no results yet.</p>}
          {Boolean(favorites.artists.length) && (
            <ul>
              {favorites.artists.map((a, i) => (
                <li className="is-clickable link" key={i}>
                  {a.name}
                  <Link to={`/artists/${a._id}`}>
                    {" "}
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="albums">
          <h2 className="title small">Albums</h2>
          {!favorites.albums.length && <p>Sorry, no results yet.</p>}
          {Boolean(favorites.albums.length) && (
            <ul>
              {favorites.albums.map((a, i) => (
                <li key={i}>
                  {a.title} by {a.artist.name}
                  <Link
                    className="is-clickable link"
                    size="xs"
                    to={`/albums/${a._id}`}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* <div className="labels"></div>
          <div className="styles"></div> */}
      </div>
    </>
  );
}
