import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/useAuth";

export default function NavAdmin() {
  const { isLoading, currentUser } = useAuth();

  if (isLoading) return null;

  return (
    <nav id="nav_admin" className="nav row">
      {currentUser && currentUser.role === "admin" && (
        <>
          <FontAwesomeIcon icon={faCog} />
          &nbsp;
          <NavLink
            className="link"
            activeClassName="is-active"
            to="/admin/artists"
          >
            artists
          </NavLink>
          <NavLink
            className="link"
            activeClassName="is-active"
            to="/admin/albums"
          >
            albums
          </NavLink>
          <NavLink
            className="link"
            activeClassName="is-active"
            to="/admin/labels"
          >
            labels
          </NavLink>
          <NavLink
            className="link"
            activeClassName="is-active"
            to="/admin/styles"
          >
            styles
          </NavLink>
        </>
      )}
    </nav>
  );
}
