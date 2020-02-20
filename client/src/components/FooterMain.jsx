import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const iconCode = <FontAwesomeIcon icon={faCode} />;
const iconHeart = <FontAwesomeIcon icon={faHeart} />;
const iconCoffee = <FontAwesomeIcon icon={faCoffee} />;

export default function FooterMain() {
  return (
    <footer id="footer_main">
      <b>
        Made with {iconHeart} + {iconCode} + {iconCoffee}
      </b>
    </footer>
  );
}
