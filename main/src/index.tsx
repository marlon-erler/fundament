import { Theme, setTheme } from "./_Support/theme";

import ViewRoot from "./Main/viewRoot";
import registerServiceWorker from "./_Support/serviceWorker";

// prepare
document.title = "My App";
setTheme(Theme.Standard);
registerServiceWorker();

// build UI
document.body.append(ViewRoot());
