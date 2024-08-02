# web-app-base

This repo is a foundation for web applications. It ships with a cache-first service worker, a web-app manifest, and Google's material icons.

# Install

1. Download the latest release
2. Unzip, cd into the new directory
3. `npm install`

# Develop & Build

- You can either extract the `dist` directory for a basic static website, or use the `src/index.tsx` as your entry point.
- Use `npm run build` to bundle the project.

# References

- If you're looking for a minimalist alternative to react, I'd recommend checking out my project called [bloatless-react](https://github.com/marlon-erler/bloatless-react).
- The icons are a download of the [Google Material Icons](https://github.com/google/material-design-icons).

# Icons

Google's material icons font will be applied to elements with the `.icon` class:

```HTML
<span class="icon">favorite</span>
```