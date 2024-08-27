import * as React from "bloatless-react";

import Button, { ButtonStyle } from "./Components/button";
import { Theme, setTheme } from "./Support/theme";

import Icon from "./Components/icon";
import registerServiceWorker from "./Support/serviceWorker";

// prepare
document.title = "My App";
setTheme(Theme.Standard);
registerServiceWorker();

function test() {
  alert("Hello!");
}

// build UI
document.body.append(
  <div>
    <h1>Hello, world!</h1>
    {Button("Standard", ButtonStyle.Standard, test)}
    {Button("Primary", ButtonStyle.Primary, test)}
    {Button("Danger", ButtonStyle.Danger, test)}
  </div>
);
