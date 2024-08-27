import * as React from "bloatless-react";

import Button, { ButtonStyle } from "./Components/button";
import { Theme, setTheme } from "./Support/theme";

import Icon from "./Components/icon";
import Select from "./Components/select";
import registerServiceWorker from "./Support/serviceWorker";

// prepare
document.title = "My App";
setTheme(Theme.Standard);
registerServiceWorker();

const options = new React.ListState<string>(["a", "b"]);
const selectedOption = new React.State("");
options.add("c");

// build UI
document.body.append(
  <div>
    <h1>Hello, world!</h1>
    <span subscribe:innerText={selectedOption}></span>
    {Select(selectedOption, options)}
  </div>
);
