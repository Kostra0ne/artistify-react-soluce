import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function IconDashboard({size}) {
  return (
    <NavLink className="icon-dashboard link" activeClassName="is-active" to="/dashboard">
      <FontAwesomeIcon size={size} icon={faUserCircle} />
    </NavLink>
  );
}
