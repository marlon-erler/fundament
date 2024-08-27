import * as React from "bloatless-react";

import Button, { ButtonStyle } from "./Components/button";
import { Theme, setTheme } from "./Support/theme";

import Icon from "./Components/icon";
import Modal from "./Components/modal";
import ProgressBar from "./Components/progress";
import Select from "./Components/select";
import registerServiceWorker from "./Support/serviceWorker";

// prepare
document.title = "My App";
setTheme(Theme.Standard);
registerServiceWorker();

const isOpen = new React.State(false);
function openModal() {
  isOpen.value = true;
}
function closeModal() {
  isOpen.value = false;
}

// build UI
document.body.append(
  <div>
    <h1>Hello, world!</h1>
    {Button("Open Modal", ButtonStyle.Primary, openModal)}
    {Modal(
      isOpen,
      <main>
        <h1>This is a modal</h1>
      </main>,
      [
        Button("Cancel", ButtonStyle.Standard, closeModal),
        Button("Save", ButtonStyle.Primary, closeModal),
      ]
    )}
  </div>
);
