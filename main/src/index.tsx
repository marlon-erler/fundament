import * as React from "bloatless-react";

enum Theme {
  Standard = "standard-theme",
  Aero = "aero-theme",
}

document.title = "My App";
document.body.setAttribute("theme", Theme.Standard);

document.body.append(<h1>Hello, world!</h1>);
