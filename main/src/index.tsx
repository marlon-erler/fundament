import { Theme, setTheme } from "./_Support/theme";

import Page from "./Main/view";
import registerServiceWorker from "./_Support/serviceWorker";

// prepare
document.title = "My App";
setTheme(Theme.Standard);
registerServiceWorker();

// build UI
document.body.append(
  Page()
);
