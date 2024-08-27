import * as React from "bloatless-react";

export enum ButtonStyle {
  Standard = "standard",
  Primary = "primary",
  Danger = "danger",
}

export default function Button(
  label: string,
  style: ButtonStyle,
  action: (e: PointerEvent) => void
): HTMLSpanElement {
  return (
    <button on:click={action} class={style}>
      {label}
    </button>
  );
}
