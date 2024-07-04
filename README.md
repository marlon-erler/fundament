# carbon-mini

Carbon-Mini is a minimal stylesheet inspired by IBM Carbon Design

# Features

- Responsive
- Supports dark/light mode
- Styles for all major elements
- Modal dialog, tab-like navigation

# Install

1. Download the latest release
2. Unzip, cd into the new directory
3. `npm install`

# Develop & Build

- You can either extract the `dist` directory for a basic static website, or use the `src/index.tsx` as your entry point.
- Use `npm run build` to bundle the project.
- All assets excluding scripts (fonts, images, stylesheets, etc) go into the `dist` directory. Import them through index.html or a stylesheet.

# References

- If you-re looking for a minimalist alternative to react, I'd recommend checking out my project called [bloatless-react](https://github.com/marlon-erler/bloatless-react).
- This project is inspired by the [IBM Carbon Design System](https://carbondesignsystem.com/).
- The font used in this project is [IBM Plex](https://www.ibm.com/plex/).
- The icons are a download of the [Google Material Icons](https://github.com/google/material-design-icons).

# Utility Classes

## Flexbox and Grid

- `flex-column`
- `flex-row`
- `flex` (gets `flex: 1`)
- `gap` (applies standard gap)
- `grid`
- `align-start`
- `align-center`
- `align-end`
- `justify-start`
- `justify-center`
- `justify-end`
- `justify-apart`

## Sizes

- `width-100`
- `width-50`
- `width-input` (width of input elements)
- `width-content` (width of the `<p>` element)

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

The text of a label should be put in a `<span>` element:

```HTML
<label>
  <span>Some input</span>
  <input placeholder="type here" />
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

You can add the `tile` class to `<div>`, `<label>` and `<button>` elements to create a tile. This may help clean up the interface.

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
- add `accent-color` style (ie. for checkboxes)
- fix overflow in tab content

## v3
- add `gap` utility class