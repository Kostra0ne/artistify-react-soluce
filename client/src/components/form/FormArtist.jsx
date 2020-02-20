import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import APIHandler from "../../api/APIHandler";
// styles
import "./../../styles/form.css";

export default withRouter(function FormArtist({
  mode = "create",
  _id,
  history,
  match
}) {
  const selectStylesEl = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isBand, setIsBand] = useState(false);
  const [styleID, setStyleID] = useState("");
  const [styles, setStyles] = useState(null);

  useEffect(() => {
    if (selectStylesEl.current)
    console.log("=>", selectStylesEl);
    
  }, [selectStylesEl]);

  useEffect(() => {
    // use to fetch the previous database values for the artist to update
    const initFormData = async () => {
      const apiRes = await APIHandler.get(`/artists/${_id}`);
      // set the function's state with the api response
      setName(apiRes.data.artist.name);
      setDescription(apiRes.data.artist.description);
      apiRes.data.artist.style && setStyleID(apiRes.data.artist.style._id);
      setIsBand(apiRes.data.artist.isBand);
    };

    const fetchResources = async () => {
      // this fom should provide a list of artists and labels to display in selection/options
      const apiRes = await APIHandler.get(`/styles/`);
      // update the function's state with the results
      setStyles(apiRes.data.styles);
    };

    fetchResources();
    // When in Update mode, first we need to fetch the previous artists infos from database
    if (mode === "edit") initFormData();

    return () => console.log("cleanup");
  }, [mode, _id]);

  const handleSubmit = async e => {
    e.preventDefault();

    // we'll need to upload an image for the artists, so let's use a form data
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const fd = {};
    fd.name = name;
    fd.description = description;
    fd.isBand = isBand;
    fd.style = styleID;

    try {
      // send the artists to the api's server
      // form sent as post if Create mode
      if (mode === "create") await APIHandler.post("/artists", fd);
      // form sent as patch if Update mode
      else await APIHandler.patch(`/artists/${match.params.id}`, fd);

      // here, we access history as a destructured props (see the parameters of this component)
      // history is accessible since we wrapped the component in the withRouter function
      history.push("/admin/artists");
      // done !
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  console.log("FORM ARTIST styles", styles);

  // if (selectStylesEl) {
    if (styles && selectStylesEl.current) {
      console.log("go go", selectStylesEl);
      console.log("go go ?", selectStylesEl.current);
    }
  // }

  // if (!styles) return null;

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

      <label className="label" htmlFor="description">
        description
      </label>
      <textarea
        className="input"
        id="description"
        cols="30"
        rows="30"
        defaultValue={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>

      <label className="label" htmlFor="style">
        style
      </label>
      {Boolean(styles && styles.length) && (
        <select
          className="input"
          id="style"
          ref={selectStylesEl}
          value={styleID}
          onChange={e => setStyleID(e.target.value)}
        >
          {styles.map((s, i) => (
            <option value={s._id} key={i}>
              {s.name}
            </option>
          ))}
        </select>
      )}
      <label className="label" htmlFor="isBand">
        is band ?
      </label>
      <div className="row justify-start">
        <label className="label" htmlFor="isband">
          yes
        </label>
        {/* below names are mandatory for multiple input radios tied to the same state's key/value */}
        <input
          id="isband"
          type="radio"
          name="isBand"
          checked={isBand === true}
          onChange={e => setIsBand(true)}
        />
        <label className="label" htmlFor="isnotband">
          no
        </label>
        <input
          id="isnotband"
          type="radio"
          name="isBand"
          checked={isBand === false}
          onChange={e => setIsBand(false)}
        />
      </div>

      <button className="btn">ok</button>
    </form>
  );
});
