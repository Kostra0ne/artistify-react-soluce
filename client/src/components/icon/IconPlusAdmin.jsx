import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function IconFormAdmin({ endpoint }) {
  return (
    <Link className="icon-form-open link is-clickable" title="go to create form" to={`/admin/${endpoint}/create`}>
      <FontAwesomeIcon size="xs" icon={faPlus} />
    </Link>
  );
}
