import React, { useState } from "react";
import APIHandler from "./../../api/APIHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";

export default function IconFavorite({
  isAlreadyFavorite = false,
  resourceId,
  resourceType
}) {
  const [isFavorite, setIsFavorite] = useState(isAlreadyFavorite);

  const toggleFavorite = () => {
    APIHandler.patch(`/users/favorites/${resourceType}/${resourceId}`, {})
      .then(apiRes => {
        console.log(apiRes.data);
        setIsFavorite(apiRes.data.isFavorite === true);
      })
      .catch(apiErr => console.error(apiErr));
  };

  return (
    <FontAwesomeIcon
      onClick={toggleFavorite}
      className={`fa-lg icon-favorite is-clickable ${
        isFavorite ? "is-favorite" : ""
      }`}
      icon={isFavorite ? faHeartFull : faHeart}
      size="xs"
    />
  );
}
