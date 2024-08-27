import * as React from "bloatless-react";

export function ConfirmationButton(
  actionLabel: string,
  cancelLabel: string,
  icon: string,
  action: () => void
): HTMLDivElement {
  const isActionRequested = new React.State(false);
  const isActionNotRequested = React.createProxyState(
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

  return (
    <div class="flex-row width-100 max-width-input">
      <button class="flex-1" on:click={cancelRequest} toggle:hidden={isActionNotRequested}>
        {cancelLabel}
        <span class="icon">undo</span>
      </button>
      <button
        class="danger flex-1"
        on:click={requestAction}
        toggle:hidden={isActionRequested}
      >
        {actionLabel}
        <span class="icon">{icon}</span>
      </button>
      <button
        class="danger flex-1"
        on:click={performAction}
        toggle:hidden={isActionNotRequested}
      >
        {actionLabel}
        <span class="icon">warning</span>
      </button>
    </div>
  );
}
