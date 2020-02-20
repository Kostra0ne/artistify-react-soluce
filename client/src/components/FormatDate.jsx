import React from "react";
import moment from "moment";

const formatDate = ({ date, rule="YYYY-MM-DD" }) => <span className="date">{moment(date).format(rule)}</span>;
export default formatDate;
