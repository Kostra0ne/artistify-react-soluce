import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
// custom tools
import APIHandler from "./../../api/APIHandler";
import CustomInputFile from "./../icon/IconAvatarAdmin";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

export default withRouter(function FormAlbum({
  mode = "create",
  _id,
  history,
  match
}) {
  const [artistID, setArtistID] = useState("");
  const [artists, setArtists] = useState(undefined);
  const [cover, setCover] = useState(null);
  const [coverTmp, setCoverTmp] = useState(null);
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState(undefined);
  const [labelID, setLabelID] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [title, setTitle] = useState("");

  // useEffect used to get the previous database values for the album to update...
  useEffect(() => {
    const getArtistsFromDB = async () => {
      // since this form needs a list of artists and labels to display in HTML select/option
      try {
        // make an async call to get these mandatory resources
        const apiRes = await APIHandler.get(`/artists/`);
        // update the function's state with the results
        setArtists(apiRes.data.artists);
        setArtistID(artists[0]._id);
      } catch (err) {
        console.error(err);
      }
    };

    const getLabelsFromDB = async () => {
      // this form needs a list of artists and labels to display in HTML select/option
      try {
        // make an async call to get these mandatory resources
        const apiRes = await APIHandler.get(`/labels/`);
        // update the function's state with the results
        setLabels(apiRes.data.labels);
        setLabelID(labels[0]._id);
      } catch (err) {
        console.error(err);
      }
    };

    getLabelsFromDB();
    getArtistsFromDB();
  }, []);

  // initiale form field in edit mode
  useEffect(() => {
    var ready = false;
    const initFormData = async () => {
      const apiRes = await APIHandler.get(`/albums/${_id}`);
      // the album to update has been fetched from database
      setArtistID(apiRes.data.album.artist._id);
      setCover(apiRes.data.album.cover);
      setDescription(apiRes.data.album.description);
      // label is not mandatory, check presence of the key before setting it
      apiRes.data.album.label && setLabelID(apiRes.data.album.label._id);
      setTitle(apiRes.data.album.title);
      setReleaseDate(apiRes.data.album.releaseDate);
      ready = true;
    };

    if (mode === "edit" && !ready) initFormData();

    return () => console.log("cleanup");
  }, [mode, _id]);

  const handleSubmit = async e => {
    e.preventDefault();

    // we need a form data to send the file
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const fd = new FormData(); // form data allows you to send req.body programatically
    fd.append("artist", artistID); // append insert a key value pair in the form data object
    fd.append("cover", cover); // repeat the process for each value to post/patch
    fd.append("description", description);
    fd.append("label", labelID);
    // var datestr = (new Date(fromDate)).toUTCString();
    fd.append("releaseDate", releaseDate);
    fd.append("title", title);

    try {
      // form sent as post if Create mode
      if (mode === "create") await APIHandler.post("/albums", fd);
      // form sent as patch if Update mode
      else await APIHandler.patch(`/albums/${match.params.id}`, fd);

      // just below, we access history as a destructured props (see the parameters of this component)
      // history is accessible since we wrapped the component in the withRouter function
      // history.push("/admin/albums");

      // congrats : this form is now ready to use :)
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  const handleCover = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // when the fileReader ends reading image  ...
      const baseString = reader.result;
      setCover(file);
      setCoverTmp(baseString); // set the tmp avatar as an image source before upload
    };
    reader.readAsDataURL(file); // read the file from the local disk
  };


  return artists === undefined || labels === undefined ? (
    <div>loading...</div>
  ) : !artists.length ? (
    <div>
      You need to <Link to="/admin/artists/create">create artist(s)</Link> first
      before adding album(s).
    </div>
  ) : (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="title">
        title
      </label>
      <input
        className="input"
        id="title"
        type="text"
        defaultValue={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label className="label" htmlFor="artists">
        artist
      </label>
      <select
        className="input"
        id="artists"
        value={artistID}
        onChange={e => setArtistID(e.target.value)}
      >
        {Boolean(artists.length) &&
          artists.map((a, i) => (
            <option value={a._id} key={i}>
              {a.name}
            </option>
          ))}
      </select>

      <label className="label" htmlFor="labels">
        label
      </label>
      <select
        className="input"
        id="labels"
        value={labelID}
        onChange={e => setLabelID(e.target.value)}
      >
        {Boolean(labels.length) &&
          labels.map((l, i) => (
            <option value={l._id} key={i}>
              {l.name}
            </option>
          ))}
      </select>

      <label className="label" htmlFor="releaseDate">
        release date
      </label>
      <input
        className="input"
        id="releaseDate"
        type="date"
        defaultValue={releaseDate}
        onChange={e => setReleaseDate(e.target.value)}
      />

      <label className="label" htmlFor="cover">
        cover
      </label>
      <CustomInputFile
        avatar={coverTmp || cover}
        clbk={e => handleCover(e.target.files[0])}
      />

      <label className="label" htmlFor="description">
        description
      </label>
      <textarea
        className="input"
        id="description"
        cols="30"
        rows="10"
        defaultValue={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>

      <button className="btn">ok</button>
    </form>
  );
});
