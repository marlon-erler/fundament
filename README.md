# carbon-mini

Carbon-Mini is a minimal stylesheet inspired by IBM Carbon Design. It ships as a preconfigured esbuild project with everything you need to get started.

# Features

- Responsive
- Supports dark/light mode
- Styles for all major elements
- Modal dialog, tab-like navigation
- Available offline through Service Workers (HTTPS only)

# Install

1. Download the latest release
2. Unzip, cd into the new directory
3. `npm install`

# Develop & Build

- You can either extract the `dist` directory for a basic static website, or use the `src/index.tsx` as your entry point.
- Use `npm run build` to bundle the project.
- All assets excluding scripts (fonts, images, stylesheets, etc) go into the `dist` directory. Import them through index.html or a stylesheet.
- You can generate the icon for your app [here](https://icongen.onrender.com/).

# References

- If you-re looking for a minimalist alternative to react, I'd recommend checking out my project called [bloatless-react](https://github.com/marlon-erler/bloatless-react).
- This project is inspired by the [IBM Carbon Design System](https://carbondesignsystem.com/).
- The font used in this project is [IBM Plex](https://www.ibm.com/plex/).
- The icons are a download of the [Google Material Icons](https://github.com/google/material-design-icons).

# Utility Classes

## General

- `.mobile-only`
- `.break-all`
- `.break-word`
- `.ellipsis` (applies text-overflow: ellipsis and other required styles)
- `scroll-v`
- `scroll-h`

## Flexbox and Grid

- `flex-column`
- `flex-row`
- `flex` (gets `flex: 1`)
- `flex-no` (gets `flex: 0`)
- `flex-wrap`
- `grid`
- `align-start`
- `align-center`
- `align-end`
- `justify-start`
- `justify-center`
- `justify-end`
- `justify-apart`

## Position

- `absolute`
- `relative`
- `sticky`
- `top-0`
- `bottom-0`
- `left-0`
- `right-0`

## Sizes

- `width-100`
- `width-50`
- `width-input` (width of input elements)
- `width-content` (width of the `<p>` element)
- `height-100`

## Spacing

- `gap` (applies standard gap)
- `control-gap` (applies gap for i.e. buttons)
- `large-gap` (applies large gap)
- `margin-0`
- `padding` (applies standard padding)
- `padding-0`
- `padding-h` (applies standard horizontal padding)
- `padding-top`
- `padding-bottom`
- `margin-bottom` (applies standard bottom margin)

## Text Colors
- `success`
- `warning`
- `error`
- `info`

## Border
- `border-bottom`

# Utility Attributes

- `hidden`
- `disabled`
- `selected` (applies blue outline)

# Layout

Carbon-Mini provides two layout patterns:

- Split view (two panes)
- Tabs (similar to iOS/macOS)

The underlying code is mostly the same:

```HTML
<html>
  <head>
    <!-- snip -->
  </head>
  <body>
    <main>
      <article id="1">
        <header>
            Tab 1
            <span>
                <!-- buttons go here -->
            </span>
        </header>
        <div>
          <!-- content goes here -->
        </div>
        <footer>
          <!-- footer can go here -->
        </footer>
      </article>
      <article id="2">
        <header>
            Tab 2
            <span>
                <!-- buttons go here -->
            </span>
        </header>
        <div>
          <!-- content goes here -->
        </div>
        <footer>
          <!-- footer can go here -->
        </footer>
      </article>
    </main>
  </body>
</html>
```

Note:

- The ids must be different but can be anything you'd like.
- For the tab layout, you can add as many `<article>` elements as you'd like, the split view layout is limited to two.

## Split view

Note that the split view will only be split on wider screens. On mobile, you can use the `scrollIntoView()` method to navigate between them.

Add the `split` class to the `<main>` element

```HTML
<html>
  <head>
    <!-- snip -->
  </head>
  <body>
    <main class="split">
      <!-- snip -->
    </main>
  </body>
</html>
```

## Tabs

The tab layout requires you to keep the `<main>` element in the index.html file. If you're using JavaScript or TypeScript to build your UI, append the `<article>` tags to the `<main>` tag directly.

Similarly, the `<menu>` tag should be added directly to the index.html file.

```HTML
<html>
  <head>
    <!-- snip -->
  </head>
  <body>
    <menu>
      <a class="tab-link" href="#1" active>
        <span class="icon">
          <!-- icon name goes here-->
        </span>
        <!-- tab label goes here-->
      </a>
      <a class="tab-link" href="#2">
        <span class="icon">
          <!-- icon name goes here-->
        </span>
        <!-- tab label goes here-->
      </a>
    </menu>
    <main class="split">
      <!-- snip -->
    </main>
  </body>
</html>
```

# Elements

Most HTML elements are supported just like you would expect. Carbon-Mini provides a few additional elements:

## Icon

Refer to [Google Fonts](https://fonts.google.com/icons) to find icon names.

```HTML
<span class="icon">icon_name</span>
```

## Button

In addition to the standard look, there are three more styles:

```HTML
<button class="primary">Primary button</button>
<button class="danger">Danger button</button>
<button class="ghost">Ghost button</button>
```

You can also append icons to a button:

```HTML
<button class="primary">
  Primary button
  <span class="icon">icon_name</span>
</button>
```

## Label

For classic inputs and textareas, the text of a label should be put in a `<span>` element:

```HTML
<label>
  <span>Some input</span>
  <input placeholder="type here" />
</label>
```

For checkboxes and radios, use 
```HTML
<label class="inline">
  <input type="checkbox" />
  Some checkbox
</label>
```

## Modal

```HTML
<div class="modal">
  <!-- the first div is the actual "box" -->
  <div>
    <main>
      <!-- main content goes here -->
    </main>
    <div class="flex-row">
      <!-- buttons go here -->
    </div>
  </div>
</div>
```

## Tile

You can add the `tile` class to `<div>`, `<label>` and `<button>` elements to create a tile, the primary contents must go into another `<div>`.

You can add icons before and/or after the `<div>` element.

```HTML
<div class="tile">
  <div>
    <!-- content goes here -->
  </div>
</div>

<button class="tile">
  <div>
    <b>Button tile</b>
    <span>Click here</span>
  </div>
</button>

<label class="tile">
  <div>
    <span>Input</span>
    <input placeholder="type here" />
  </div>
</label>
```

# Changelog

## v2

Features:

- add `gap` utility class
- add utility classes for positioning
- add `<footer>` element

Fixes:

- add `accent-color` style (ie. for checkboxes)
- fix overflow in tab content
- fix menu overlapping content on mobile
- remove width restrictions for inputs and content elements on mobile
- clean and reoranize the code

## v3

Features:

- add offline support
- define app icon paths
- make theme color support dark mode
- add colors for success, warning, error, and info
- add more utility classes
- hide scrollbar for tabs
- add `index.css` link to HTML file

Fixes:

- fix quirks mode
- fix safe-area padding
- fix backdrop blur on safari
- fix layout
- fix headline margin
- fix modal layout
- fix placement of footer when no `<menu>` is present
- mark utility class styles as !important
- add `word-break` to tile