# Storybook Addon Carbon Theme

A Storybook addon that applies the four [Carbon Design System](https://carbondesignsystem.com) themes to your stories and, optionally, to Storybook's own UI.

This is the **Storybook 9** branch. For Storybook 10, see [`main`](https://github.com/devadula-nandan/Carbon_Theme_Storybook_Addon/tree/main).

## Features

- **Theme switcher** in the toolbar: White, Gray 10, Gray 90 and Gray 100.
- **Carbon tokens in the preview.** The selected theme's `--cds-*` custom properties are set on the preview's root element, so Carbon components in your stories follow the theme.
- **Carbonize toggle.** Restyles Storybook itself (toolbar, sidebar, addon panels and docs pages) with Carbon tokens. It is off by default, and toggling it reloads the page.
- **Remembers your choice.** The theme and the Carbonize state are saved in `localStorage`.

## Storybook version support

Each Storybook major is supported from its own branch.

| Storybook | Branch                                                                                        | Built against |
| --------- | --------------------------------------------------------------------------------------------- | ------------- |
| 10        | [`main`](https://github.com/devadula-nandan/Carbon_Theme_Storybook_Addon/tree/main)           | 10.2.10       |
| 9         | [`v9`](https://github.com/devadula-nandan/Carbon_Theme_Storybook_Addon/tree/v9) (this branch) | 9.1.10        |

## Usage

The addon is not published to npm yet. To try it, run the Storybook in this repo (see [Development](#development)).

Once the package is installed in a project, register it in `.storybook/main.ts`:

```ts
const config = {
  addons: ["storybook-carbon-theme"],
};

export default config;
```

## How it works

The addon sets two attributes on the `<html>` element of both the Storybook UI and the preview iframe. You can target them in your own CSS.

| Attribute                | Values                        |
| ------------------------ | ----------------------------- |
| `storybook-carbon-theme` | `white`, `g10`, `g90`, `g100` |
| `carbonize-storybook`    | `true`, `false`               |

It also hides Storybook's built-in backgrounds tool, because the Carbon theme sets the canvas background.

## Development

This branch uses npm, and CI runs on Node.js 20.

```sh
npm install
npm run start
```

`start` builds the addon in watch mode and runs the demo Storybook at http://localhost:6006.

| Script                    | What it does                                       |
| ------------------------- | -------------------------------------------------- |
| `npm run build`           | Builds the addon into `dist/`                      |
| `npm run build-storybook` | Builds the demo Storybook into `storybook-static/` |

The addon code is in [`src`](./src): `manager.tsx` registers the toolbar tools, `preview.ts` applies the theme inside the preview, and [`styles`](./src/styles/README.md) holds the Carbon SCSS.

## License

[MIT](./LICENSE)
