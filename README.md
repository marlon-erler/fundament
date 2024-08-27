# web-app-base

This repo is a foundation for web applications. It ships with a custimizable stylesheet, a service worker for offline support, a web-app manifest, Google's material icons, and [bloatless-react](https://github.com/marlon-erler/bloatless-react) for reactivity.

# Install

1. Download the latest release
2. Unzip, cd into the new directory
3. `npm install`

# Develop & Build

- You can either extract the `dist` directory for a basic static website, or use the `src/index.tsx` as your entry point.
- Use `npm run build` to bundle the project.

# References

- The icons are a download of the [Google Material Icons](https://github.com/google/material-design-icons).

# Icons

Google's material icons font will be applied to elements with the `.icon` class:

```HTML
<span class="icon">favorite</span>
```

# CSS

The stylesheet supports most HTML elements. For some, there are additional requirements:

## Button

There are four different button styles

```HTML
<button class="transparent">Transparent Button</button>
<button class="standard">Standard Button</button>
<button class="primary">Primary Button</button>
<button class="danger">Dangerous Button</button>
```

## Select

For the dropdown arrow, implement the tag as follows:

```HTML
<div class="select-wrapper">
    <select>
        <option>Some option</option>
    </select>

    <span class="icon">arrow_drop_down</span>
</div>
```

## Progress

Indeterminate:

```HTML
<div role="progressbar">
    <div indeterminate></div>
</div>
```

With value:

```HTML
<div role="progressbar">
    <div style="width: 60%"></div>
</div>
```

## Surface

You can use the `.surface` class to create cards-like elements. You can add a leading and a trailing icon. The primary content should go into a separate `<div>`.

```HTML
<div class="surface">
    <span class="icon">favorite</span>
    <div>
        Card
        <span class="secondary">This is a card</span>
    </div>
    <span class="icon">favorite</span>
</div>
```

## Modal

Toggle the `[open]` attribute to open or close the modal.

```HTML
 <div class="modal-wrapper" open>
    <div class="modal-window">
        <main>
            <!--main content here-->
        </main>
        <div class="control-row">
            <button class="standard">Close</button>
        </div>
    </div>
</div>
```

# Classes

## Text

- `.secondary`
- `.success`
- `.warning`
- `.error`
- `.info`

## Layout

basic:

- `.flex-1`
- `.flex-0`
- `.grid-gap`
- `.row-gap` - applies gap also used in control-row

direction:

- `.flex-row`
- `.flex-column`
- `.flex-row-reverse`
- `.flex-column-reverse`

align:

- `.align-start`
- `.align-center`
- `.align-end`

justify:

- `.justify-start`
- `.justify-center`
- `.justify-end`

miscellaneous:

- `.control-row` - used for a horizontal row of buttons

## Size

- `.width-100`
- `.max-width-input` - sets maximum width to match input
- `.max-width-content` - sets maximum width to match content
- `.height-100`

## Overflow

all:

- `overflow-auto`
- `overflow-hidden`
- `overflow-visible`
- `overflow-scroll`

horizontal:

- `overflow-x-auto`
- `overflow-x-hidden`
- `overflow-x-visible`
- `overflow-x-scroll`

vertical:

- `overflow-y-auto`
- `overflow-y-hidden`
- `overflow-y-visible`
- `overflow-y-scroll`

# Changelog

## v2

Fixes:

- Improve theme
- Improve modal layout on smaller screens
- Redo progress styles
