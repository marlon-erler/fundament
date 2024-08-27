import * as React from "bloatless-react";

import Button, { ButtonStyle } from "./button";

import { ModalContentWindow } from "./modal";

export class PopoverCoordinates {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }
}

export default function Popover(
  isOpen: React.State<boolean>,
  coordinates: PopoverCoordinates,
  mainElement: HTMLElement,
  buttons: HTMLButtonElement[]
): HTMLDivElement {
  const popover = ModalContentWindow(isOpen, mainElement, buttons);
  popover.classList.add("popover");

  isOpen.subscribe((newValue) => {
    if (newValue == false) return;

    // reset old styles
    popover.style.top = "";
    popover.style.left = "";

    // get info
    const width = popover.offsetWidth;
    const height = popover.offsetHeight;

    // get dimentions
    let top = coordinates.y - height / 2;
    let left = coordinates.x - width / 2;

    // guard offset to top/left
    if (top < 0) {
      top = 0;
    }
    if (left < 0) {
      left = 0;
    }

    // guard offset to bottom/right
    if (top + height > document.body.offsetHeight) {
      const offset = top + height - document.body.offsetHeight;
      top -= offset;
    }
    if (left + width > document.body.offsetWidth) {
      const offset = left + width - document.body.offsetWidth;
      left -= offset;
    }

    popover.style.top = top + "px";
    popover.style.left = left + "px";
  });

  return popover;
}

export function PopoverButton(
  isOpen: React.State<boolean>,
  buttonLabel: string,
  buttonStyle: ButtonStyle,
  mainElement: HTMLElement,
  popoverButtons: HTMLButtonElement[]
) {
  const coordinates: PopoverCoordinates = new PopoverCoordinates();

  function openPopover(e: MouseEvent) {
    openPopoverAtClickLocation(isOpen, coordinates, e);
  }

  document.body.append(
    Popover(isOpen, coordinates, mainElement, popoverButtons)
  );

  return Button(buttonLabel, buttonStyle, openPopover);
}

export function openPopoverAtClickLocation(
  isPopoverOpen: React.State<boolean>,
  coordinates: PopoverCoordinates,
  clickEvent: MouseEvent
): void {
  coordinates.x = clickEvent.clientX;
  coordinates.y = clickEvent.clientY;
  isPopoverOpen.value = true;
}
