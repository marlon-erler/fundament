import "./styles.css";

import * as React from "bloatless-react";

import StartPage from "./startPage";

export default function ViewRoot() {
  return <div>{StartPage()}</div>;
}
