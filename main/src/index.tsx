import * as React from "bloatless-react";

import Button, { ButtonStyle } from "./Components/button";
import Popover, {
  PopoverButton,
  PopoverCoordinates,
  openPopoverAtClickLocation,
} from "./Components/popover";
import { Theme, setTheme } from "./Support/theme";

import Icon from "./Components/icon";
import Modal from "./Components/modal";
import ProgressBar from "./Components/progress";
import Select from "./Components/select";
import Slider from "./Components/slider";
import registerServiceWorker from "./Support/serviceWorker";

// prepare
document.title = "My App";
setTheme(Theme.Standard);
registerServiceWorker();

const value = new React.State(50);

// build UI
document.body.append(
  <div>
    <h1>Hello, world!</h1>
    <span subscribe:innerText={value}></span>
    <button class="primary">Click here</button>
    <input bind:value={value}></input>
    {Slider(value)}
    {ProgressBar(new React.State<any>(undefined))}
  </div>
);
