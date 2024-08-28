(() => {
  // src/_Support/theme.ts
  function setTheme(theme) {
    document.body.setAttribute("theme", theme);
  }

  // node_modules/bloatless-react/index.ts
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

  // src/_Components/button.tsx
  function Button(label, style, action) {
    return /* @__PURE__ */ createElement("button", { "on:click": action, class: style }, label);
  }

  // src/Components/documentationLink.tsx
  function DocumentationLink(iconName, title, description, link) {
    function open() {
      window.open(link);
    }
    return /* @__PURE__ */ createElement("button", { class: "standard documentation-link", "on:click": open }, /* @__PURE__ */ createElement("span", { class: "icon" }, iconName), /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("b", null, title), /* @__PURE__ */ createElement("span", { class: "secondary" }, description)), /* @__PURE__ */ createElement("span", { class: "icon" }, "arrow_forward"));
  }

  // src/_Components/icon.tsx
  function Icon(iconName) {
    return /* @__PURE__ */ createElement("span", { class: "icon" }, iconName);
  }

  // src/Components/featureTile.tsx
  function FeatureTile(iconName, title, description) {
    return /* @__PURE__ */ createElement("div", { class: "surface feature-tile" }, Icon(iconName), /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("b", null, title), /* @__PURE__ */ createElement("span", { class: "secondary" }, description)));
  }

  // src/Components/gettingStartedStep.tsx
  function GettingStartedStep(number, description) {
    return /* @__PURE__ */ createElement("div", { class: "getting-started-step" }, /* @__PURE__ */ createElement("span", { class: "number" }, number), description);
  }

  // src/Main/startPage.tsx
  function openGithub() {
    window.open("https://github.com/marlon-erler/web-app-base");
  }
  function getStarted() {
    gettingStartedSection.scrollIntoView();
  }
  var titleSection = /* @__PURE__ */ createElement("section", { class: "hero", id: "title-section" }, /* @__PURE__ */ createElement("div", { class: "shadow" }), /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h1", null, "Fundament"), /* @__PURE__ */ createElement("h3", null, "No Setup. No Bloat. Everything you need."), /* @__PURE__ */ createElement("div", { class: "button-row" }, Button("View on GitHub", "standard" /* Standard */, openGithub), Button("Get Started", "primary" /* Primary */, getStarted))));
  var featureSection = /* @__PURE__ */ createElement("section", { class: "content" }, /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h2", null, "Features"), /* @__PURE__ */ createElement("div", { class: "feature-grid" }, FeatureTile(
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
  var gettingStartedSection = /* @__PURE__ */ createElement("section", { class: "content" }, /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h2", null, "Get Started"), /* @__PURE__ */ createElement("div", { class: "getting-started-list" }, GettingStartedStep(1, /* @__PURE__ */ createElement("span", null, "Download the ", /* @__PURE__ */ createElement("a", { href: "https://github.com/marlon-erler/fundament/releases" }, "latest release"), " from GitHub")), GettingStartedStep(
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
  var documentationLinkSection = /* @__PURE__ */ createElement("section", { class: "content" }, /* @__PURE__ */ createElement("div", null, /* @__PURE__ */ createElement("h2", null, "Documentation"), /* @__PURE__ */ createElement("div", { class: "documentation-link-list" }, DocumentationLink(
    "deployed_code",
    "Components",
    "Buttons, Sliders, Modals, and more",
    "about:blank"
  ), DocumentationLink(
    "cycle",
    "Reactivity",
    "Check out the documentation for bloatless-react",
    "https://github.com/marlon-erler/bloatless-react"
  ), DocumentationLink(
    "palette",
    "Customization",
    "Modify themes or create your own",
    "about:blank"
  ))));
  function StartPage() {
    return /* @__PURE__ */ createElement("div", null, titleSection, featureSection, gettingStartedSection, documentationLinkSection);
  }

  // src/Main/viewRoot.tsx
  function ViewRoot() {
    return /* @__PURE__ */ createElement("div", null, StartPage());
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
