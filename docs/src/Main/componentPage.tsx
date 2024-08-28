import "./startPage.css";

import * as React from "bloatless-react";

import { Page, PageHiddenState } from "./viewRoot";

import ContentPage from "../Components/contentPage";
import Header from "../Components/header";

export default function ComponentPage(selectedPage: React.State<Page>) {
  // ROUTING
  const isHidden = new PageHiddenState(selectedPage, Page.components);

  return (
    <div toggle:hidden={isHidden}>
      {Header("Components")}
      {ContentPage()}
    </div>
  );
}
