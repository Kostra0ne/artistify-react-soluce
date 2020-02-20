import React from "react";
import Star from "./Star";
import StarC from "./StarClickable";

export default function stars({ avgRate, clbk, css, maxRate = 5, title }) {

  const stars = []; // stars will be filled with star icons (one imported custom component)
  const Icon = !clbk ? Star : StarC;
  const hasDecimal = avgRate && Boolean(avgRate.toString().split(".")[1]);
  const dec = avgRate && hasDecimal ? hasDecimal[1] / 10 : 0; //get decimal part of the avg

  for (let i = 0, acc = avgRate; i < maxRate; i++, acc--) {
    let icon = acc !== 0 && dec === acc ? "half" : acc > 0 ? "full" : "empty"; // pass the correct icon (full OR empty)
    stars.push(<Icon key={i} rate={i + 1} shape={icon} clbk={clbk || null} />);
  }

  return (
    <div title={title} className={"stars " + (css || "")}>
      {stars}
    </div>
  );
}
