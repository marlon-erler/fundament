(() => {
  // node_modules/bloatless-react/index.ts
  var State = class {
    _value;
    _bindings = /* @__PURE__ */ new Set();
    // init
    constructor(initialValue) {
      this._value = initialValue;
    }
    // value
    get value() {
      return this._value;
    }
    set value(newValue) {
      if (this._value == newValue) return;
      this._value = newValue;
      this.callSubscriptions();
    }
    // subscriptions
    callSubscriptions() {
      this._bindings.forEach((fn) => fn(this._value));
    }
    subscribe(fn) {
      this._bindings.add(fn);
      fn(this._value);
    }
    subscribeSilent(fn) {
      this._bindings.add(fn);
    }
    // stringify
    toString() {
      return JSON.stringify(this._value);
    }
  };
  function createProxyState(statesToSubscibe, fn) {
    const proxyState = new State(fn());
    statesToSubscibe.forEach(
      (state) => state.subscribe(() => proxyState.value = fn())
    );
    return proxyState;
  }
  function createElement(tagName, attributes = {}, ...children) {
    const element = document.createElement(tagName);
    if (attributes != null)
      Object.entries(attributes).forEach((entry) => {
        const [attributename, value2] = entry;
        const [directiveKey, directiveValue] = attributename.split(":");
        switch (directiveKey) {
          case "on": {
            switch (directiveValue) {
              case "enter": {
                element.addEventListener("keydown", (e) => {
                  if (e.key != "Enter") return;
                  value2();
                });
                break;
              }
              default: {
                element.addEventListener(directiveValue, value2);
              }
            }
            break;
          }
          case "subscribe": {
            const state = value2;
            state.subscribe(
              (newValue) => element[directiveValue] = newValue
            );
            break;
          }
          case "bind": {
            const state = value2;
            state.subscribe(
              (newValue) => element[directiveValue] = newValue
            );
            element.addEventListener(
              "input",
              () => state.value = element[directiveValue]
            );
            break;
          }
          case "toggle": {
            if (value2.subscribe) {
              const state = value2;
              state.subscribe(
                (newValue) => element.toggleAttribute(directiveValue, newValue)
              );
            } else {
              element.toggleAttribute(directiveValue, value2);
            }
            break;
          }
          case "set": {
            const state = value2;
            state.subscribe(
              (newValue) => element.setAttribute(directiveValue, newValue)
            );
            break;
          }
          case "children": {
            switch (directiveValue) {
              case "set": {
                const state = value2;
                state.subscribe((newValue) => {
                  element.innerHTML = "";
                  element.append(...[newValue].flat());
                });
                break;
              }
              case "append":
              case "prepend": {
                try {
                  const [listState, toElement] = value2;
                  listState.handleAddition((newItem) => {
                    const child = toElement(newItem);
                    listState.handleRemoval(
                      newItem,
                      () => child.remove()
                    );
                    if (directiveValue == "append") {
                      element.append(child);
                    } else if (directiveValue == "prepend") {
                      element.prepend(child);
                    }
                  });
                } catch (error) {
                  console.error(error);
                  throw `error: cannot process subscribe:children directive. 
 Usage: "children:append={[list, converter]}"; you can find a more detailed example in the documentation.`;
                }
              }
            }
            break;
          }
          default:
            element.setAttribute(attributename, value2);
        }
      });
    children.filter((x) => x).forEach((child) => element.append(child));
    return element;
  }

  // src/Support/theme.ts
  function setTheme(theme) {
    document.body.setAttribute("theme", theme);
  }

  // src/Components/confirmationButton.tsx
  function ConfirmationButton(actionLabel, cancelLabel, icon, action) {
    const isActionRequested = new State(false);
    const isActionNotRequested = createProxyState(
      [isActionRequested],
      () => isActionRequested.value == false
    );
    function requestAction() {
      isActionRequested.value = true;
    }
    function cancelRequest() {
      isActionRequested.value = false;
    }
    function performAction() {
      action();
      cancelRequest();
    }
    return /* @__PURE__ */ createElement("div", { class: "flex-row row-gap width-100 max-width-input" }, /* @__PURE__ */ createElement(
      "button",
      {
        class: "standard flex-1",
        "on:click": cancelRequest,
        "toggle:hidden": isActionNotRequested
      },
      cancelLabel,
      /* @__PURE__ */ createElement("span", { class: "icon" }, "undo")
    ), /* @__PURE__ */ createElement(
      "button",
      {
        class: "danger flex-1",
        "on:click": requestAction,
        "toggle:hidden": isActionRequested
      },
      actionLabel,
      /* @__PURE__ */ createElement("span", { class: "icon" }, icon)
    ), /* @__PURE__ */ createElement(
      "button",
      {
        class: "danger flex-1",
        "on:click": performAction,
        "toggle:hidden": isActionNotRequested
      },
      actionLabel,
      /* @__PURE__ */ createElement("span", { class: "icon" }, "warning")
    ));
  }

  // src/Components/progress.tsx
  function ProgressBar(percentValueOrUndefined) {
    const valueDiv = /* @__PURE__ */ createElement("div", null);
    percentValueOrUndefined.subscribe((newValue) => {
      if (newValue == void 0) {
        valueDiv.style.width = "";
        valueDiv.setAttribute("indeterminate", "");
      } else {
        valueDiv.style.width = `${newValue}%`;
        valueDiv.removeAttribute("indeterminate");
      }
    });
    return /* @__PURE__ */ createElement("div", { role: "progressbar" }, valueDiv);
  }

  // src/Components/slider.tsx
  function Slider(value2, min = 0, max = 100, step = 1) {
    const valueDiv = /* @__PURE__ */ createElement("div", null);
    value2.subscribe((newValue) => {
      const valueInPercent = newValue / max * 100;
      valueDiv.style.width = `${valueInPercent}%`;
    });
    return /* @__PURE__ */ createElement("div", { class: "slider-wrapper" }, valueDiv, /* @__PURE__ */ createElement(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        "bind:value": value2
      }
    ));
  }

  // src/Support/serviceWorker.ts
  async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/"
        });
        if (registration.installing) {
          setTimeout(() => window.location.reload(), 500);
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Could not install service worker: ${error}`);
      }
    }
  }

  // src/index.tsx
  document.title = "My App";
  setTheme("aero" /* Aero */);
  registerServiceWorker();
  var value = new State(50);
  document.body.append(
    /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h1", null, "Hello, world!"), /* @__PURE__ */ createElement("span", { "subscribe:innerText": value }), /* @__PURE__ */ createElement("button", { class: "primary" }, "Click here"), /* @__PURE__ */ createElement("input", { "bind:value": value }), Slider(value), ProgressBar(new State(void 0)), ConfirmationButton("Delete", "Cancel", "delete", () => alert("test")))
  );
})();
