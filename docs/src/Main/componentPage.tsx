import "./startPage.css";

import * as React from "bloatless-react";

import ContentPage from "../Components/contentPage";
import Header from "../Components/header";

export default function ComponentPage() {
  return (
    <div>
      {Header("Components")}
      {ContentPage()}
    </div>
  );
}
