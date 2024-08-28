import * as React from "bloatless-react";

export default function SplitView(data: [HTMLElement, HTMLElement][]) {
  return (
    <div class="split-view">
      <div class="index-pane">{...data.map((x) => x[0])}</div>
      <div class="content-pane">{...data.map((x) => x[1])}</div>
    </div>
  );
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
