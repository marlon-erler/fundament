import * as React from "bloatless-react";

import { Page, changePage } from "../Main/viewRoot";

import Icon from "../_Components/icon";

export default function Header(title: string) {
  function closePage() {
    changePage(Page.startPage);
  }

  return (
    <header>
      <button class="standard square" on:click={closePage}>
        {Icon("arrow_back")}
      </button>
      <b>{title}</b>
    </header>
  );
}
