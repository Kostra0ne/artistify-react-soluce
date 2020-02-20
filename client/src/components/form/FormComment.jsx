import React, { Component } from "react";
// styles
import "./../../styles/form.css";

export default class FormComment extends Component {
  state = {
    message: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { message } = this.state;

    return (
      <form
        className="form"
        onSubmit={(e) => {
            e.preventDefault();
            this.props.clbk(message);  
            this.setState({message: ""})
        }}
        onChange={this.handleChange}
      >
        <div className="row">

          <input
            className="input"
            name="message"
            id="message"
            cols="30"
            rows="10"
            onChange={() => void(0)}
            value={message}
            placeholder="leave a comment here..."
          ></input>

          <button className="btn">send!</button>
        </div>
      </form>
    );
  }
}
