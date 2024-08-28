import "./styles.css";

import * as React from "bloatless-react";

import ComponentPage from "./componentPage";
import StartPage from "./startPage";

// TYPES
export enum Page {
  startPage,
  components,
  customization,
}

// ROUTING
const selectedPage = new React.State(Page.startPage);
const pageContent = React.createProxyState([selectedPage], () => {
  switch (selectedPage.value) {
    case Page.components:
      return ComponentPage()
    default:
      return StartPage();
  }
});

export function changePage(page: Page) {
  selectedPage.value = page;
}

// MAIN
export default function ViewRoot() {
  return <div children:set={pageContent}></div>;
}
