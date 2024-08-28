import "./startPage.css";

import * as React from "bloatless-react";

import { Page, PageHiddenState, changePage } from "./viewRoot";

import DocumentationLink from "../Components/documentationLink";
import FeatureTile from "../Components/featureTile";
import GettingStartedStep from "../Components/gettingStartedStep";

export default function StartPage(selectedPage: React.State<Page>) {
  // ROUTING
  const isHidden = new PageHiddenState(selectedPage, Page.startPage)
  
  // METHODS
  function openGithub() {
    window.open("https://github.com/marlon-erler/web-app-base");
  }

  function getStarted() {
    gettingStartedSection.scrollIntoView();
  }

  // SECTIONS
  const titleSection: HTMLElement = (
    <section class="hero" id="title-section">
      <div class="shadow"></div>
      <div>
        <h1>Fundament</h1>
        <h3>No Setup. No Bloat. Everything you need.</h3>

        <div class="button-row">
          <button class="standard" on:click={openGithub}>View on Github</button>
          <button class="primary" on:click={getStarted}>Get Started</button>
        </div>
      </div>
    </section>
  );

  const featureSection: HTMLElement = (
    <section class="content">
      <div>
        <h2>Features</h2>
        <div class="feature-grid">
          {FeatureTile(
            "package",
            "Complete",
            "Stylesheet, components, and reactivity included."
          )}
          {FeatureTile(
            "palette",
            "Customizable",
            "Select an existing theme or build your own with ease."
          )}
          {FeatureTile(
            "wifi_off",
            "Offline Support",
            "Your PWA is available offline right out of the box."
          )}
          {FeatureTile(
            "code",
            "Free & Open Source",
            "Check out the code on GitHub or create your own fork."
          )}
        </div>
      </div>
    </section>
  );

  const gettingStartedSection: HTMLElement = (
    <section class="content">
      <div>
        <h2>Get Started</h2>
        <div class="getting-started-list">
          {GettingStartedStep(
            1,
            <span>
              Download the{" "}
              <a href="https://github.com/marlon-erler/fundament/releases">
                latest release
              </a>{" "}
              from GitHub
            </span>
          )}
          {GettingStartedStep(
            2,
            <span>
              Run <b>npm install</b> to get all dependencies
            </span>
          )}
          {GettingStartedStep(
            3,
            <span>
              Open <b>src/Main/view.tsx</b>
            </span>
          )}
          {GettingStartedStep(
            4,
            <span>
              Serve <b>dist</b> on a local web server
            </span>
          )}
          {GettingStartedStep(
            5,
            <span>
              Run <b>npm run build</b> to build
            </span>
          )}
        </div>
      </div>
    </section>
  );

  const documentationLinkSection: HTMLElement = (
    <section class="content">
      <div>
        <h2>Documentation</h2>
        <div class="documentation-link-list">
          {DocumentationLink(
            "deployed_code",
            "Components",
            "Buttons, Sliders, Modals, and more",
            () => changePage(Page.components)
          )}
          {DocumentationLink(
            "cycle",
            "Reactivity",
            "Check out the documentation for bloatless-react",
            () => window.open("https://github.com/marlon-erler/bloatless-react")
          )}
          {DocumentationLink(
            "palette",
            "Customization",
            "Modify themes or create your own",
            () => changePage(Page.customization)
          )}
        </div>
      </div>
    </section>
  );

  return (
    <div toggle:hidden={isHidden}>
      {titleSection}
      {featureSection}
      {gettingStartedSection}
      {documentationLinkSection}
    </div>
  );
}
