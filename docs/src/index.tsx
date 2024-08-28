import { Theme, setTheme } from "./_Support/theme";

import Page from "./Main/view";
import registerServiceWorker from "./_Support/serviceWorker";

// prepare
document.title = "Fundament - Documentation";
setTheme(Theme.Standard);
registerServiceWorker();

// build UI
document.body.append(
  Page()
);
