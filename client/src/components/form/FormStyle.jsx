import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import APIHandler from "./../../api/APIHandler";
// styles
import "./../../styles/form.css";

export default withRouter(function FormStyle({
  mode = "create",
  _id,
  history,
  match
}) {
  const [name, setName] = useState("");
  const [wikiURL, setWikiURL] = useState("");
  const [color, setColor] = useState("#000");

  useEffect(() => {
    const initFormData = async () => {
      const apiRes = await APIHandler.get(`/styles/${_id}`);
      console.log(apiRes);
      setName(apiRes.data.name);
      setWikiURL(apiRes.data.wikiURL);
      setColor(apiRes.data.color);
    };

    if (mode === "edit") initFormData();

    return () => console.log("cleanup");
  }, [mode, _id]);

  const handleSubmit = async e => {
    e.preventDefault();

    const styleInfos = {
      color,
      name,
      wikiURL
    };
console.log(history)
    try {
      if (mode === "create") await APIHandler.post("/styles", styleInfos);
      else await APIHandler.patch(`/styles/${match.params.id}`, styleInfos);

      // here, we access history as a destructured props (see the parameters of this component)
      // history is accessible since we wrapped the component in the withRouter function
      history.push("/admin/styles");
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="name">
        name
      </label>
      <input
        className="input"
        id="name"
        type="text"
        defaultValue={name}
        onChange={e => setName(e.target.value)}
      />

      <label className="label" htmlFor="wikiURL">
        wiki URL
      </label>
      <input
        className="input"
        id="wikiURL"
        type="text"
        defaultValue={wikiURL}
        onChange={e => setWikiURL(e.target.value)}
      />

      <label className="label" htmlFor="color">
        color
      </label>
      <input
        className="input color is-clickable"
        id="color"
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
      />

      <button className="btn">ok</button>
    </form>
  );
});
