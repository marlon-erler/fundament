import * as React from "bloatless-react";

import { Theme, setTheme } from "./Support/theme";

import registerServiceWorker from "./Support/serviceWorker";

// prepare
document.title = "My App";
setTheme(Theme.Aero);
registerServiceWorker();

// build UI
document.body.append(
  <div>
    <h1>Hello, world!</h1>
  </div>
);
