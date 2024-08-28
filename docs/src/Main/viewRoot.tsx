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

export function changePage(page: Page) {
  selectedPage.value = page;
}

export class PageHiddenState extends React.State<boolean> {
  constructor(selectedPage: React.State<Page>, self: Page) {
    super(false);

    selectedPage.subscribe((newValue) => {
      this.value = newValue != self;
    });
  }
}

// MAIN
export default function ViewRoot() {
  return (
    <div>
      {StartPage(selectedPage)}
      {ComponentPage(selectedPage)}
    </div>
  );
}
