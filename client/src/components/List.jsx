import React from "react";

export default function List({ data, cssList, cssItem, Component }) {

  if (!data) return <p>Error : Component List expects an iterable "data" props</p>;

  return (
    <ul className={`list ${cssList || "generic"}`}>
      {Boolean(data.length) ? data.map((d, i) => (
        <li key={i} className={cssItem}>
          {Component && <Component data={d} />}
          {!Component && d}
        </li>
      )) : <p>Sorry, no data yet ...</p>}
    </ul>
  );
}
