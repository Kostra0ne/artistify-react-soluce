import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../../auth/useAuth";

// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";
import "./../../styles/icon-favorite.css";

const checkIsAlreadyFavorite = (id, favorites) => favorites.includes(id);

export default function CardAlbum({ data: album }) {
  const { isLoggedIn, currentUser } = useAuth();

  return <Link to={`/albums/${album._id}`}>
    <h3 className="title">{album.title}</h3>
    <img className="cover" src={album.cover} alt={`${album.title} cover, album by ${album.artist ? album.artist.name : "..."}`} />
    {isLoggedIn && <IconFav resourceId={album._id} resourceType="albums" isAlreadyFavorite={!isLoggedIn ? false : checkIsAlreadyFavorite(album._id, currentUser ? currentUser.favorites.albums : [])} />}

  </Link>;
}
