import * as React from "bloatless-react";

export default function DocumentationLink(
  iconName: string,
  title: string,
  description: string,
  action: () => void
) {
  return (
    <button class="standard documentation-link" on:click={action}>
      <span class="icon">{iconName}</span>
      <div>
        <b>{title}</b>
        <span class="secondary">{description}</span>
      </div>
      <span class="icon">arrow_forward</span>
    </button>
  );
}
