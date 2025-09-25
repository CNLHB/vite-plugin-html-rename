# vite-plugin-html-rename

[![npm](https://img.shields.io/npm/dt/vite-plugin-html-rename?style=for-the-badge)](https://www.npmjs.com/package/vite-plugin-html-rename) ![GitHub Repo stars](https://img.shields.io/github/stars/CNLHB/vite-plugin-html-rename?label=GitHub%20Stars&style=for-the-badge) [![GitHub](https://img.shields.io/github/license/CNLHB/vite-plugin-html-rename?color=blue&style=for-the-badge)](https://github.com/CNLHB/vite-plugin-html-rename/blob/master/LICENSE)
![GitHub last commit](https://img.shields.io/github/last-commit/CNLHB/vite-plugin-html-rename?style=for-the-badge) [![Issues](https://img.shields.io/github/issues/CNLHB/vite-plugin-html-rename?style=for-the-badge)](https://github.com/CNLHB/vite-plugin-html-rename/issues)

A Vite plugin that automatically renames HTML files based on entry names during the build process.

## Features

- 🚀 Automatically rename HTML files based on Vite's input configuration
- 📦 Works with multi-entry builds
- 🔧 TypeScript support with full type definitions
- ⚡ Zero configuration required
- 🎯 Customizable entry mapping

## Installation

```bash
npm install vite-plugin-html-rename --save-dev
```

```bash
yarn add vite-plugin-html-rename --dev
```

```bash
pnpm add vite-plugin-html-rename --save-dev
```

## Usage

### Basic Usage

```js
// vite.config.js
import { defineConfig } from 'vite';
import htmlRename from 'vite-plugin-html-rename';

export default defineConfig({
  plugins: [htmlRename()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html',
        login: 'login.html'
      }
    }
  }
});
```

With this configuration, the plugin will rename the output HTML files to match the entry names:
- `index.html` → `main.html`
- `admin.html` → `admin.html` (no change needed)
- `login.html` → `login.html` (no change needed)

### Custom Entry Mapping

You can provide a custom mapping for HTML file renaming:

```js
// vite.config.js
import { defineConfig } from 'vite';
import htmlRename from 'vite-plugin-html-rename';

export default defineConfig({
  plugins: [
    htmlRename({
      home: 'index.html',
      dashboard: 'admin.html',
      auth: 'login.html'
    })
  ]
});
```

### Single Entry Mapping

For simple cases, you can pass a string to create a single entry mapping:

```js
// vite.config.js
import { defineConfig } from 'vite';
import htmlRename from 'vite-plugin-html-rename';

export default defineConfig({
  plugins: [
    htmlRename('home') // This will map 'home' to 'index.html'
  ]
});
```

## API

### `htmlRename(options?)`

#### Parameters

- `options` (optional): Configuration options for the plugin

#### Options

The plugin accepts the following option types:

```typescript
type PluginOptions = string | InputConfig | undefined;

interface InputConfig {
  [key: string]: string;
}
```

- **`string`**: Creates a single entry mapping where the string is the entry name and maps to `'index.html'`
- **`InputConfig`**: An object mapping entry names to HTML file paths
- **`undefined`**: Uses Vite's `build.rollupOptions.input` configuration

## How It Works

1. The plugin hooks into Vite's `writeBundle` phase
2. It reads the input configuration (either from plugin options or Vite config)
3. For each HTML entry, it renames the output file to match the entry name
4. Only processes files with `.html` extension
5. Skips renaming if the original name already matches the target name

## Example Scenarios

### Multi-page Application

```js
// vite.config.js
export default defineConfig({
  plugins: [htmlRename()],
  build: {
    rollupOptions: {
      input: {
        index: 'src/pages/home.html',
        about: 'src/pages/about.html',
        contact: 'src/pages/contact.html'
      }
    }
  }
});
```

Output files:
- `src/pages/home.html` → `dist/index.html`
- `src/pages/about.html` → `dist/about.html`
- `src/pages/contact.html` → `dist/contact.html`

### Custom Naming Strategy

```js
// vite.config.js
export default defineConfig({
  plugins: [
    htmlRename({
      'landing-page': 'index.html',
      'user-dashboard': 'dashboard.html',
      'admin-panel': 'admin.html'
    })
  ]
});
```

## TypeScript Support

This plugin is written in TypeScript and provides full type definitions. You can import types for better development experience:

```typescript
import htmlRename, { PluginOptions, InputConfig } from 'vite-plugin-html-rename';

const config: InputConfig = {
  home: 'index.html',
  admin: 'admin.html'
};

export default defineConfig({
  plugins: [htmlRename(config)]
});
```

## Requirements

- Vite 5.0+
- Node.js 18+

## License

MIT © [aiwa](https://cnlhb.github.io/blog/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you encounter any issues, please report them on [GitHub Issues](https://github.com/CNLHB/vite-plugin-html-rename/issues).
