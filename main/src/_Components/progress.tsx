import * as React from "bloatless-react";

export default function ProgressBar(
  percentValueOrUndefined: React.State<number | undefined>
): HTMLProgressElement {
  const valueDiv: HTMLDivElement = <div></div>;

  percentValueOrUndefined.subscribe((newValue) => {
    if (newValue == undefined) {
      valueDiv.style.width = "";
      valueDiv.setAttribute("indeterminate", "");
    } else {
      valueDiv.style.width = `${newValue}%`;
      valueDiv.removeAttribute("indeterminate");
    }
  });

  return <div role="progressbar">{valueDiv}</div>;
}
