import React, { Component } from 'react'
import apiHandler from "../../api/APIHandler";

// styles
import "../../styles/form.css";

export default class FormContact extends Component {
    state = {
        message: null,
        from: null,
        subject: null
      };
    
      handleSubmit = async evt => {
        evt.preventDefault();
        try {
          const apiRes = await apiHandler.post("/contact", this.state);
          console.log(apiRes);
        } catch (apiErr) {
          console.log(apiErr);
        }
      };
    
      handleChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value });
      };

      
    render() {
        return (
            <form
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            className="form"
          >
            <h1 className="title">What's up?!</h1>
            <label className="label" htmlFor="from">
              email
            </label>
            <input className="input" id="from" type="text" name="from" />
            <label className="label" htmlFor="subject">
              subject
            </label>
            <input className="input" id="subject" type="text" name="subject" />
            <label className="label" htmlFor="message">
              message
            </label>
            <textarea
              className="input"
              name="message"
              id="message"
              cols="30"
              rows="10"
            ></textarea>
            <button className="btn">ok</button>
          </form>
        )
    }
}
