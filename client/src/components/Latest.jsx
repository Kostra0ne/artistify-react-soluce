import React, { useState, useEffect } from "react";
// custom tools
import apiHandler from "./../api/APIHandler";
import List from "./List";

export default function Latest({ endpoint, limit, Component }) {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    // component did mount
    apiHandler
      .get(`/${endpoint}?sort=createdAt&order=-1&limit=${limit}`)
      .then(apiRes => {
        setLatest(apiRes.data[endpoint]);
      })
      .catch(apiErr => console.error(apiErr));
  // }, []);
  }, [endpoint, limit]);

  return latest.length ? (
    <List
      data={latest}
      Component={Component}
      cssList="cards one-row"
      cssItem="card latest artist"
    />
  ) : (
    <p className="has-no-result">no latest {endpoint}</p>
  );
}
