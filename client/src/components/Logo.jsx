import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphonesAlt } from "@fortawesome/free-solid-svg-icons";

export default function Logo() {
  return (
    <Link to="/" className="title medium is-clickable logo">
      <FontAwesomeIcon size="1x" icon={faHeadphonesAlt} />
      <span className="text">Artistify</span>
    </Link>
  );
}
