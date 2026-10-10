# Storybook Addon Carbon Theme

A Storybook addon that applies the four [Carbon Design System](https://carbondesignsystem.com) themes to your stories and, optionally, to Storybook's own UI.

This is the **Storybook 10** branch. For Storybook 9, see [`v9`](https://github.com/devadula-nandan/Carbon_Theme_Storybook_Addon/tree/v9).

[Live demo](https://devadula-nandan.github.io/Carbon_Theme_Storybook_Addon/)

## Features

- **Theme switcher** in the toolbar: White, Gray 10, Gray 90 and Gray 100.
- **Carbon tokens in the preview.** The selected theme's `--cds-*` custom properties are set on the preview's root element, so Carbon components in your stories follow the theme.
- **Carbonize toggle.** Restyles Storybook itself with Carbon tokens. It is off by default.

> The Storybook 10 port is still in progress. Carbonize currently covers the toolbar and the docs page background. The sidebar and addon panel styles from the `v9` branch are not ported yet.

## Storybook version support

Each Storybook major is supported from its own branch. `main` always tracks the latest major.

| Storybook | Branch                                                                                            | Built against |
| --------- | ------------------------------------------------------------------------------------------------- | ------------- |
| 10        | [`main`](https://github.com/devadula-nandan/Carbon_Theme_Storybook_Addon/tree/main) (this branch) | 10.2.10       |
| 9         | [`v9`](https://github.com/devadula-nandan/Carbon_Theme_Storybook_Addon/tree/v9)                   | 9.1.10        |

## Usage

The addon is not published to npm yet. To try it, open the [live demo](https://devadula-nandan.github.io/Carbon_Theme_Storybook_Addon/) or run the Storybook in this repo (see [Development](#development)).

Once the package is installed in a project, register it in `.storybook/main.ts`:

```ts
const config = {
  addons: ['storybook-carbon-theme'],
};

export default config;
```

## How it works

The addon keeps its state in two Storybook globals and mirrors them as attributes on the `<html>` element of both the Storybook UI and the preview iframe. You can target the attributes in your own CSS.

| Global               | Attribute on `<html>`    | Values                          |
| -------------------- | ------------------------ | ------------------------------- |
| `carbonTheme`        | `storybook-carbon-theme` | `white`, `g10`, `g90`, `g100`   |
| `carbonizeStorybook` | `data-carbonize`         | `true` when on, absent when off |

## Development

This branch uses pnpm and needs Node.js 20.19+ or 22.12+, the minimum for Storybook 10.

```sh
pnpm install
pnpm start
```

`start` builds the addon in watch mode and runs the demo Storybook at http://localhost:6006.

| Script                 | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `pnpm build`           | Builds the addon into `dist/`                      |
| `pnpm build-storybook` | Builds the demo Storybook into `storybook-static/` |
| `pnpm lint`            | Runs ESLint                                        |
| `pnpm format`          | Formats the code with Prettier                     |

The addon code is in [`src`](./src): `manager.tsx` registers the toolbar tools, `preview.ts` applies the theme inside the preview, and [`styles`](./src/styles) holds the Carbon SCSS.

## License

[MIT](./LICENSE)
