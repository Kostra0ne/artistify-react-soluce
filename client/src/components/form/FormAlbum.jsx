import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import CustomInputFile from "./../icon/IconAvatarAdmin";
import APIHandler from "./../../api/APIHandler"
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

class FormAlbum extends Component {

  state = {
    title: "",
    artist: "",
    style: "",
    releaseDate: "",
    description: "",
    artists: [],
    labels: [],
  };

  async componentDidMount() {
    if (this.props.mode === "edit") {
      const apiRes = await Promise.all([
        APIHandler.get("/artists"),
        APIHandler.get("/styles")]);
      console.log("edit", apiRes);
    }
  }

  handleImage = (e) => {
    console.log(e.target.files[0])
  };

  render() {
    const { artists, labels } = this.state;
    return (
      <form className="form">
        <label htmlFor="title" className="label">Title</label>
        <input id="title" type="text" className="input" />
        <label htmlFor="artist" className="label">Artist</label>
        <select className="input" name="artist" id="artist">
          {Boolean(artists.length) && artists.map((a, i) => (
            <option value={a._id}>{a.name}</option>
          ))
          }
        </select>
        <label htmlFor="style" className="label">Style</label>
        <select className="input" name="style" id="style">
          {Boolean(labels.length) && labels.map((l, i) => (
            <option value={l._id}>{l.name}</option>
          ))
          }
        </select>
        <label htmlFor="releaseDate" className="label">Release Date</label>
        <input type="date" id="releaseDate" className="input" name="releaseDate" />
        <label htmlFor="" className="label">Cover</label>
        <CustomInputFile clbk={this.handleImage} />
        <label htmlFor="description" className="label">Description</label>
        <textarea name="description" id="" cols="30" rows="10" className="input"></textarea>
        <button className="btn">ok</button>
      </form>
    );
  }
}

export default withRouter(FormAlbum);
