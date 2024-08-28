import * as React from "bloatless-react";

export default function GettingStartedStep(
  number: number,
  description: HTMLElement,
) {
  return (
    <div class="getting-started-step">
      <span class="number">{number}</span>
      {description}
    </div>
  );
}
