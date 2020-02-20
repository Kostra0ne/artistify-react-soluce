import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

const IconGoBack = ({ history, size = "1x" }) => (
  <FontAwesomeIcon
    title="browse back to previous page"
    className="link is-clickable"
    onClick={history.goBack}
    size={size}
    icon={faArrowAltCircleLeft}
  />
);

export default withRouter(IconGoBack);
