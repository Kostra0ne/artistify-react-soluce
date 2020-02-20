import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBurger({ navMobileClbk }) {
  return (
    <span id="nav_burger">
      <FontAwesomeIcon
        id="nav_burger_icon"
        onClick={navMobileClbk}
        className="is-clickable fa-lg"
        icon={faBars}
      />
    </span>
  );
}
