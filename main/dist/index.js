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
  function createElement(tagName, attributes = {}, ...children) {
    const element = document.createElement(tagName);
    if (attributes != null)
      Object.entries(attributes).forEach((entry) => {
        const [attributename, value] = entry;
        const [directiveKey, directiveValue] = attributename.split(":");
        switch (directiveKey) {
          case "on": {
            switch (directiveValue) {
              case "enter": {
                element.addEventListener("keydown", (e) => {
                  if (e.key != "Enter") return;
                  value();
                });
                break;
              }
              default: {
                element.addEventListener(directiveValue, value);
              }
            }
            break;
          }
          case "subscribe": {
            const state = value;
            state.subscribe(
              (newValue) => element[directiveValue] = newValue
            );
            break;
          }
          case "bind": {
            const state = value;
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
            if (value.subscribe) {
              const state = value;
              state.subscribe(
                (newValue) => element.toggleAttribute(directiveValue, newValue)
              );
            } else {
              element.toggleAttribute(directiveValue, value);
            }
            break;
          }
          case "set": {
            const state = value;
            state.subscribe(
              (newValue) => element.setAttribute(directiveValue, newValue)
            );
            break;
          }
          case "children": {
            switch (directiveValue) {
              case "set": {
                const state = value;
                state.subscribe((newValue) => {
                  element.innerHTML = "";
                  element.append(...[newValue].flat());
                });
                break;
              }
              case "append":
              case "prepend": {
                try {
                  const [listState, toElement] = value;
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
            element.setAttribute(attributename, value);
        }
      });
    children.filter((x) => x).forEach((child) => element.append(child));
    return element;
  }

  // src/Components/button.tsx
  function Button(label, style, action) {
    return /* @__PURE__ */ createElement("button", { "on:click": action, class: style }, label);
  }

  // src/Components/modal.tsx
  function ModalContentWindow(isOpen2, mainElement, buttons) {
    return /* @__PURE__ */ createElement("div", { class: "modal-window", "toggle:open": isOpen2 }, mainElement, /* @__PURE__ */ createElement("div", { class: "control-row" }, ...buttons));
  }

  // src/Components/popover.tsx
  var PopoverCoordinates = class {
    x;
    y;
    constructor(x, y) {
      this.x = x ?? 0;
      this.y = y ?? 0;
    }
  };
  function Popover(isOpen2, coordinates, mainElement, buttons) {
    const popover = ModalContentWindow(isOpen2, mainElement, buttons);
    popover.classList.add("popover");
    isOpen2.subscribe((newValue) => {
      if (newValue == false) return;
      popover.style.top = "";
      popover.style.left = "";
      const width = popover.offsetWidth;
      const height = popover.offsetHeight;
      let top = coordinates.y - height / 2;
      let left = coordinates.x - width / 2;
      if (top < 0) {
        top = 0;
      }
      if (left < 0) {
        left = 0;
      }
      if (top + height > document.body.offsetHeight) {
        const offset = top + height - document.body.offsetHeight;
        top -= offset;
      }
      if (left + width > document.body.offsetWidth) {
        const offset = left + width - document.body.offsetWidth;
        left -= offset;
      }
      popover.style.top = top + "px";
      popover.style.left = left + "px";
    });
    return popover;
  }
  function PopoverButton(isOpen2, buttonLabel, buttonStyle, mainElement, popoverButtons) {
    const coordinates = new PopoverCoordinates();
    function openPopover(e) {
      openPopoverAtClickLocation(isOpen2, coordinates, e);
    }
    document.body.append(
      Popover(isOpen2, coordinates, mainElement, popoverButtons)
    );
    return Button(buttonLabel, buttonStyle, openPopover);
  }
  function openPopoverAtClickLocation(isPopoverOpen, coordinates, clickEvent) {
    coordinates.x = clickEvent.clientX;
    coordinates.y = clickEvent.clientY;
    isPopoverOpen.value = true;
  }

  // src/Support/theme.ts
  function setTheme(theme) {
    document.body.setAttribute("theme", theme);
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
  setTheme("standard" /* Standard */);
  registerServiceWorker();
  var isOpen = new State(false);
  function closeModal() {
    isOpen.value = false;
  }
  document.body.append(
    /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h1", null, "Hello, world!"), PopoverButton(
      isOpen,
      "Open popover",
      "primary" /* Primary */,
      /* @__PURE__ */ createElement("main", null, /* @__PURE__ */ createElement("h1", null, "This is a modal")),
      [
        Button("Cancel", "standard" /* Standard */, closeModal),
        Button("Save", "primary" /* Primary */, closeModal)
      ]
    ))
  );
})();
