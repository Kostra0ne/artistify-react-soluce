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
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();


  return isLoading ? null : (

    <div>
      <h1 className="title diy">D.I.Y (User favorites)</h1>
      <p>
        Fetch currentUser's favorites with axios.
          <br />
        Update the rendered template to display them.
          <br />
        It would be better to create a dedicated component.
        </p>
    </div>


  );
}
