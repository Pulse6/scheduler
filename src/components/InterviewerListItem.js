import React from "react";

import "components/InterviewerListItem.scss";

import classnames from "classnames/bind";

export default function InterviewerListItem(props) {
  
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}