(() => {
  // src/_Support/theme.ts
  function setTheme(theme) {
    document.body.setAttribute("theme", theme);
  }

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

  // src/Components/splitView.tsx
  function SplitView(data) {
    return /* @__PURE__ */ createElement("div", { class: "split-view" }, /* @__PURE__ */ createElement("div", { class: "index-pane" }, ...data.map((x) => x[0])), /* @__PURE__ */ createElement("div", { class: "content-pane" }, ...data.map((x) => x[1])));
  }
  function SplitViewLink(label, elementToLink) {
    function scroll() {
      elementToLink.scrollIntoView();
    }
    return /* @__PURE__ */ createElement("button", { class: "standard", "on:click": scroll }, label);
  }
  function createSplitViewEntry(label, contentElement) {
    const link = SplitViewLink(label, contentElement);
    return [link, contentElement];
  }

  // src/_Components/icon.tsx
  function Icon(iconName) {
    return /* @__PURE__ */ createElement("span", { class: "icon" }, iconName);
  }

  // src/Components/header.tsx
  function Header(title) {
    function closePage() {
      changePage(0 /* startPage */);
    }
    return /* @__PURE__ */ createElement("header", null, /* @__PURE__ */ createElement("button", { class: "standard square", "on:click": closePage }, Icon("arrow_back")), /* @__PURE__ */ createElement("b", null, title));
  }

  // src/Main/componentPage.tsx
  function ComponentPage(selectedPage2) {
    const isHidden = new PageHiddenState(selectedPage2, 1 /* components */);
    return /* @__PURE__ */ createElement("div", { style: "split-view-page", "toggle:hidden": isHidden }, Header("Components"), SplitView([
      createSplitViewEntry(
        "Button",
        /* @__PURE__ */ createElement("div", { style: "min-height: 90vh" }, "BUTTON")
      ),
      createSplitViewEntry(
        "Modal",
        /* @__PURE__ */ createElement("div", { style: "min-height: 90vh; display: block" }, "MODAL")
      )
    ]));
  }

  // src/Components/documentationLink.tsx
  function DocumentationLink(iconName, title, description, action) {
    return /* @__PURE__ */ createElement("button", { class: "standard documentation-link", "on:click": action }, /* @__PURE__ */ createElement("span", { class: "icon" }, iconName), /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("b", null, title), /* @__PURE__ */ createElement("span", { class: "secondary" }, description)), /* @__PURE__ */ createElement("span", { class: "icon" }, "arrow_forward"));
  }

  // src/Components/featureTile.tsx
  function FeatureTile(iconName, title, description) {
    return /* @__PURE__ */ createElement("div", { class: "surface feature-tile" }, Icon(iconName), /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("b", null, title), /* @__PURE__ */ createElement("p", { class: "secondary" }, description)));
  }

  // src/Components/gettingStartedStep.tsx
  function GettingStartedStep(number, description) {
    return /* @__PURE__ */ createElement("div", { class: "getting-started-step" }, /* @__PURE__ */ createElement("span", { class: "number" }, number), description);
  }

  // src/Main/startPage.tsx
  function StartPage(selectedPage2) {
    const isHidden = new PageHiddenState(selectedPage2, 0 /* startPage */);
    function openGithub() {
      window.open("https://github.com/marlon-erler/web-app-base");
    }
    function getStarted() {
      gettingStartedSection.scrollIntoView();
    }
    const titleSection = /* @__PURE__ */ createElement("section", { class: "hero", id: "title-section" }, /* @__PURE__ */ createElement("div", { class: "shadow" }), /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h1", null, "Fundament"), /* @__PURE__ */ createElement("h3", null, "No Setup. No Bloat. Everything you need."), /* @__PURE__ */ createElement("p", null, "Fundament is a foundation for full-featured PWAs.", /* @__PURE__ */ createElement("br", null), "Just download and start building your app."), /* @__PURE__ */ createElement("div", { class: "button-row" }, /* @__PURE__ */ createElement("button", { class: "standard", "on:click": openGithub }, "View on Github"), /* @__PURE__ */ createElement("button", { class: "primary", "on:click": getStarted }, "Get Started"))));
    const featureSection = /* @__PURE__ */ createElement("section", { class: "content" }, /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h2", null, "Features"), /* @__PURE__ */ createElement("div", { class: "feature-grid" }, FeatureTile(
      "package",
      "Complete",
      "Stylesheet, components, and reactivity included."
    ), FeatureTile(
      "palette",
      "Customizable",
      "Select an existing theme or build your own with ease."
    ), FeatureTile(
      "wifi_off",
      "Offline Support",
      "Your PWA is available offline right out of the box."
    ), FeatureTile(
      "code",
      "Free & Open Source",
      "Check out the code on GitHub or create your own fork."
    ))));
    const gettingStartedSection = /* @__PURE__ */ createElement("section", { class: "content" }, /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h2", null, "Get Started"), /* @__PURE__ */ createElement("div", { class: "getting-started-list" }, GettingStartedStep(
      1,
      /* @__PURE__ */ createElement("span", null, "Download the", " ", /* @__PURE__ */ createElement("a", { href: "https://github.com/marlon-erler/fundament/releases" }, "latest release"), " ", "from GitHub")
    ), GettingStartedStep(
      2,
      /* @__PURE__ */ createElement("span", null, "Run ", /* @__PURE__ */ createElement("b", null, "npm install"), " to get all dependencies")
    ), GettingStartedStep(
      3,
      /* @__PURE__ */ createElement("span", null, "Open ", /* @__PURE__ */ createElement("b", null, "src/Main/view.tsx"))
    ), GettingStartedStep(
      4,
      /* @__PURE__ */ createElement("span", null, "Serve ", /* @__PURE__ */ createElement("b", null, "dist"), " on a local web server")
    ), GettingStartedStep(
      5,
      /* @__PURE__ */ createElement("span", null, "Run ", /* @__PURE__ */ createElement("b", null, "npm run build"), " to build")
    ))));
    const documentationLinkSection = /* @__PURE__ */ createElement("section", { class: "content" }, /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h2", null, "Documentation"), /* @__PURE__ */ createElement("div", { class: "documentation-link-list" }, DocumentationLink(
      "deployed_code",
      "Components",
      "Buttons, Sliders, Modals, and more",
      () => changePage(1 /* components */)
    ), DocumentationLink(
      "cycle",
      "Reactivity",
      "Check out the documentation for bloatless-react",
      () => window.open("https://github.com/marlon-erler/bloatless-react")
    ), DocumentationLink(
      "palette",
      "Customization",
      "Modify themes or create your own",
      () => changePage(2 /* customization */)
    ))));
    return /* @__PURE__ */ createElement("div", { "toggle:hidden": isHidden }, titleSection, featureSection, gettingStartedSection, documentationLinkSection);
  }

  // src/Main/viewRoot.tsx
  var selectedPage = new State(0 /* startPage */);
  function changePage(page) {
    selectedPage.value = page;
  }
  var PageHiddenState = class extends State {
    constructor(selectedPage2, self) {
      super(false);
      selectedPage2.subscribe((newValue) => {
        this.value = newValue != self;
      });
    }
  };
  function ViewRoot() {
    return /* @__PURE__ */ createElement("div", null, StartPage(selectedPage), ComponentPage(selectedPage));
  }

  // src/_Support/serviceWorker.ts
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
  document.title = "Fundament - Documentation";
  setTheme("standard" /* Standard */);
  registerServiceWorker();
  document.body.append(
    ViewRoot()
  );
})();
