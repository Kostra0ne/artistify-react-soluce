import React from "react";

// generates table head's columns dynamically
const Head = ({columns, edit = true, remove = true}) => {
  if (!columns.length) return <tr><th>error column</th></tr>
  return (
    <tr>
      {columns.map((c, i) => (
        <th key={i}>{c}</th>
      ))}
      {edit && <th>edit</th>}
      {remove && <th>trash</th>}
    </tr>
  );
};

export default Head;
