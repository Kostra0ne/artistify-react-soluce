import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// custom tools
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";


class FormArtist extends Component {
  render() {
    return (
      <>
        <h1 className="title diy">D.I.Y (FormArtist)</h1>
        <p>Code a form to Create/Update artists.</p>
        <LabPreview name="artistForm" isSmall />
        <hr />
      </>
    );
  }
}

export default withRouter(FormArtist);
