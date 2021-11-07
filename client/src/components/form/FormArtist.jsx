import React, { Component } from 'react';
import withRouter from "../../auth/withRouter";
import APIHandler from "./../../api/APIHandler";
// styles
import "./../../styles/form.css";


class FormArtist extends Component {

  state = {
    name: "",
    description: "",
    style: "",
    isBand: false,
    styles: []
  };

  componentDidMount() {
    if (this.props.mode === "edit") {
      APIHandler.get(`/artists/${this.props.match.params.id}`)
        .then(({ data }) => {
          this.setState({
            name: data.artist.name,
            description: data.artist.description,
            style: data.artist.style._id,
            isBand: data.artist.isBand,
          })
        })
        .catch(apiErr => console.error(apiErr))
    }

    APIHandler.get(`/styles/`)
      .then(({ data }) => this.setState({ styles: data }))
      .catch(apiErr => console.error(apiErr))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    APIHandler.post("/artists", this.state)
      .then(apiRes => this.props.history.push("/admin/artists"))
      .catch(apiErr => console.error(apiErr))
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form className="form artist" onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <label className="label" htmlFor="name">Name</label>
        <input className="input" id="name" name="name" type="text" defaultValue={this.state.name} />
        <label className="label" htmlFor="description">Description</label>
        <textarea className="input" name="description" id="description" cols="30" rows="10" defaultValue={this.state.description} ></textarea>
        <label className="label" htmlFor="style">Style</label>
        <select name="style" id="style">
          {
            Boolean(this.state.styles.length) && this.state.styles.map((s, i) => (
              <option key={i} value={s._id} checked={s._id === this.state.style}>{s.name} {(s._id === this.state.style).toString()}</option>
            ))
          }
        </select>
        <label className="label" >Is band ?</label>
        <div className="row is-band">
          <label className="label" htmlFor="isBand">yes</label>
          <input className="input" type="radio" id="isBand" value="yes" name="isBand" defaultChecked={this.state.isBand === true} />
          <label className="label" htmlFor="isNotBand">no</label>
          <input className="input" type="radio" id="isNotBand" value="no" name="isBand" defaultChecked={this.state.isBand === false} />
        </div>
        <button className="btn">ok</button>
      </form>
    );
  }
}

export default withRouter(FormArtist);
