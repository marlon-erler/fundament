import * as React from "bloatless-react";

import Button, { ButtonStyle } from "./Components/button";
import { Theme, setTheme } from "./Support/theme";

import Icon from "./Components/icon";
import ProgressBar from "./Components/progress";
import Select from "./Components/select";
import registerServiceWorker from "./Support/serviceWorker";

// prepare
document.title = "My App";
setTheme(Theme.Standard);
registerServiceWorker();

const value: React.State<number | undefined> = new React.State<any>(undefined);
function makeUndefined() {
  value.value = undefined;
}

// build UI
document.body.append(
  <div>
    <h1>Hello, world!</h1>
    {ProgressBar(value)}
    <input type="range" bind:value={value}></input>
    {Button("Indeterminate", ButtonStyle.Standard, makeUndefined)}
  </div>
);
