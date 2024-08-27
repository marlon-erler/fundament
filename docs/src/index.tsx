import * as React from "bloatless-react";

import { Theme, setTheme } from "./Support/theme";

import registerServiceWorker from "./Support/serviceWorker";

// prepare
document.title = "Web App Base - Documentation";
setTheme(Theme.Standard);
registerServiceWorker();

// build UI
document.body.append(
  <main>
    <h1>Web App Base</h1>
    <p>
      <a href="https://github.com/marlon-erler/web-app-base" target="_blank">
        Web App Base
      </a>{" "}
      is a minimal foundation for web apps. It contains everything necessary to
      build a PWA without any additional setup.
      <h2>Features</h2>
      <ul>
        <li>Highly themable stylesheet</li>
        <li>
          Reactivity through{" "}
          <a href="https://github.com/marlon-erler/bloatless-react">
            bloatless-react
          </a>
        </li>
        <li>
          Bundling with{" "}
          <a href="https://esbuild.github.io" target="_blank">
            esbuild
          </a>
        </li>
      </ul>
    </p>
  </main>
);
