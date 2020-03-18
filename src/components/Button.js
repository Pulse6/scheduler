import React from "react";

import "components/Button.scss";

import classnames from "classnames/bind";

// export default function Button(props) {
//    return <button>{props.children}</button>;
// } 

export default function Button(props) {

   const buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}