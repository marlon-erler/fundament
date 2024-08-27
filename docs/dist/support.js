// POPOVER
function positionPopover(popover, centerX, centerY) {
  popover.setAttribute("popover", "");
  
  // reset old styles
  popover.style.top = "";
  popover.style.left = "";

  // get info
  const width = popover.offsetWidth;
  const height = popover.offsetHeight;

  // get dimentions
  let top = centerY - height / 2;
  let left = centerX - width / 2;

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
}