import React, { Component } from "react";
// styles
import "./../../styles/form.css";

export default class FormComment extends Component {

  render() {
    const { message } = this.state;

    return (
      <form className="form">
        <button className="btn">send!</button>
      </form>
    );
  }
}
