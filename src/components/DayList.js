import React from "react";

// import "components/Button.scss";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const items = props.days.map( (day, index) => <DayListItem
  id={index}
  name={day.name}
  spots={day.spots}
  selected={day.name === props.day}
  setDay={props.setDay}
  />)
  return (
    <ul>
      {items}
    </ul>
  );
}