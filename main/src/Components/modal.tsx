import * as React from "bloatless-react";

export default function Modal(
  isOpen: React.State<boolean>,
  mainElement: HTMLElement,
  buttons: HTMLButtonElement[]
): HTMLDivElement {
  return (
    <div class="modal-wrapper" toggle:open={isOpen}>
      <div class="modal-window">
        {mainElement}
        <div class="control-row">{...buttons}</div>
      </div>
    </div>
  );
}
