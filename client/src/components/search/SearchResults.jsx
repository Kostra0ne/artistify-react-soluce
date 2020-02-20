import React from "react";
import { Link } from "react-router-dom";

export default function SearchResults({ data }) {

  return (
    <div className="search-results">
      {!Object.keys(data).length ? null : (
        <>
          <h1 className="title medium">search results</h1>
          <div className="row">
            <div className="category artists">
              <h2 className="title small">artists</h2>
              <ul className="list">
                {!!data.artists.length &&
                  data.artists.map((a, i) => (
                    <li key={i} className="item">
                      <Link className="link" to={`/artists/${a._id}`}>{a.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="category albums">
              <h2 className="title small">albums</h2>
              <ul className="list">
                {!!data.albums.length &&
                  data.albums.map((a, i) => (
                    <li key={i} className="item">
                      <Link className="link" to={`/albums/${a._id}`}>{a.title}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
