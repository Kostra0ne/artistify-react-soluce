import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../../auth/useAuth";

// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

const checkIsAlreadyFavorite = (id, favorites) => favorites.includes(id);

export default function CardArtist({ data: artist }) {
  const { isLoggedIn, currentUser } = useAuth();

  return <Link className="link" to={`/artists/${artist._id}`}>
    <div className="color" style={{ background: artist.style.color }}></div>
    <h3 className="title">{artist.name}</h3>
    {isLoggedIn && <IconFav resourceId={artist._id} resourceType="artists" isAlreadyFavorite={isLoggedIn ? false : checkIsAlreadyFavorite(artist._id, currentUser ? currentUser.favorites.artists : [])} />}
  </Link>;
}
