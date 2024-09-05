import * as React from "bloatless-react";

export default function SplitView(data: [HTMLElement, HTMLElement][]) {
  function scrollToIndex() {
    container.scrollLeft = 0;
  }

  const container: HTMLElement = (
    <div class="split-view">
      <div class="index-pane" on:mouseenter={scrollToIndex}>
        {...data.map((x) => x[0])}
      </div>
      <div class="content-pane">{...data.map((x) => x[1])}</div>
    </div>
  );

  return container;
}

export function SplitViewLink(label: string, elementToLink: HTMLElement) {
  function scroll() {
    elementToLink.scrollIntoView();
  }
  return (
    <button class="standard" on:click={scroll}>
      {label}
    </button>
  );
}

export function createSplitViewEntry(
  label: string,
  contentElement: HTMLElement
): [HTMLElement, HTMLElement] {
  const link = SplitViewLink(label, contentElement);
  return [link, contentElement];
}
