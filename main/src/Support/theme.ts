export enum Theme {
  Standard = "standard",
  Aero = "aero",
}

export function setTheme(theme: Theme): void {
  document.body.setAttribute("theme", theme);
}
