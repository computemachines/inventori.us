import React from "react";

export const dummy = {

  thing() {
    return "hello";
  }
};

export default function Dummy() {
  console.log("dynamic render");
  window.alert("dynamic");

  return React.createElement("div", {}, "Dynamic");
};