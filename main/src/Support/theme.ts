export enum Theme {
  Standard = "standard-theme",
  Aero = "aero-theme",
}

export function setTheme(theme: Theme): void {
  document.body.setAttribute("theme", theme);
}
