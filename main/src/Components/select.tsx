import * as React from "bloatless-react";

export default function Select(
  value: React.State<string>,
  options: React.ListState<string>
): HTMLSelectElement {
  value.value = [...options.value.values()][0];

  return (
    <div class="select-wrapper">
      <select
        bind:value={value}
        children:append={[options, StringToOption]}
      ></select>
      <span class="icon">arrow_drop_down</span>
    </div>
  );
}

export function Option(
  text: string,
  value: string,
  selectedOnCreate: boolean
): HTMLOptionElement {
  return (
    <option value={value} toggle:selected={selectedOnCreate}>
      {text}
    </option>
  );
}

export const StringToOption: React.StateItemConverter<string> = (
  string: string
) => {
  return Option(string, string, false);
};
