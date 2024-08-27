import * as React from "bloatless-react";

export enum ButtonStyle {
  Standard = "standard",
  Primary = "primary",
  Danger = "danger",
}
import * as React from "bloatless-react";

export default function Icon(iconName: string): HTMLSpanElement {
  return <span class="icon">{iconName}</span>;
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
