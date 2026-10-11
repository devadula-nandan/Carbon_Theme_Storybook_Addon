# Storybook Addon Carbon Theme

A Storybook addon that makes Storybook look like [Carbon Design System](https://carbondesignsystem.com): the sidebar, toolbar, addon panels and docs pages, in a light and a dark theme.

This is the **Storybook 10** branch. For Storybook 9, see [`v9`](https://github.com/devadula-nandan/carbon-theme-storybook-addon/tree/v9).

[Live demo](https://devadula-nandan.github.io/carbon-theme-storybook-addon/)

## Features

- **Light, dark or auto.** Light is Carbon's Gray 10 and dark is Gray 100. Auto follows your system setting, and keeps following it while Storybook is open. A toolbar menu switches between the three.
- **The whole Storybook UI in Carbon.** Colours, IBM Plex, square corners, Carbon tabs, fields, tables, menus and focus rings.
- **Docs pages too.** Prose, tables, code blocks and controls follow the theme.
- **Switching is instant.** A switch re-themes the page in place. Stories are not re-rendered, docs pages keep their scroll position, and the sidebar and panels keep the size you dragged them to.
- **Carbon tokens in the preview.** The active theme's `--cds-*` custom properties are set on the preview's root element, so Carbon components in your stories follow the theme.
- **Remembers your choice.** The default is auto. Whatever you pick is remembered for next time.

## Storybook version support

Each Storybook major is supported from its own branch. `main` always tracks the latest major.

| Storybook | Branch                                                                                            | Built against |
| --------- | ------------------------------------------------------------------------------------------------- | ------------- |
| 10        | [`main`](https://github.com/devadula-nandan/carbon-theme-storybook-addon/tree/main) (this branch) | 10.6.1        |
| 9         | [`v9`](https://github.com/devadula-nandan/carbon-theme-storybook-addon/tree/v9)                   | 9.1.10        |

## Usage

Install the addon:

```sh
npm install --save-dev storybook-carbon-theme
```

Then register it in `.storybook/main.ts`. It needs `@storybook/addon-docs` alongside it:

```ts
const config = {
  addons: ['@storybook/addon-docs', 'storybook-carbon-theme'],
};

export default config;
```

### Keeping your branding

The addon sets colours, type and shape, and leaves branding to you. Whatever brand you set on the manager theme in `.storybook/manager.ts` is kept:

```ts
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'My design system',
    brandUrl: 'https://example.com',
  }),
});
```

## How it works

The addon sets one attribute on the `<html>` element of both the Storybook UI and the preview iframe. You can target it in your own CSS.

| Attribute           | Values        |
| ------------------- | ------------- |
| `data-carbon-theme` | `g10`, `g100` |

The attribute always holds the theme that is applied. In auto mode that is whichever of the two the system setting resolves to.

The theme is kept out of Storybook's globals on purpose. Storybook re-renders the story and rebuilds the whole docs page whenever a global changes, so the addon holds the theme itself and tells the preview about a switch over the channel.

The Storybook UI and docs pages are themed in two steps: a Storybook theme built from Carbon's tokens, and a stylesheet for the details a theme can't express. Docs prose and form controls use [`@carbon/element-styles`](https://github.com/carbon-design-system/carbon-element-styles).

### Layering

Surfaces follow Carbon's layering model, so each one contrasts with what it sits on:

| Surface                                                      | Token         |
| ------------------------------------------------------------ | ------------- |
| The page: the story canvas, docs pages and settings pages    | `$background` |
| Sidebar, toolbar, addon panel, menus, tables and code blocks | `$layer-01`   |
| Fields on the page                                           | `$field-01`   |
| Fields inside a layer 01 surface, such as the controls       | `$field-02`   |

Inside a layer the stylesheets use Carbon's contextual tokens (`$layer`, `$field`, `$border-subtle` and so on), which resolve to the right numbered token for that surface. The `layer` mixin in [`src/styles/_carbon.scss`](./src/styles/_carbon.scss) sets that up.

Styles never reach into a story. A story only gets the Carbon tokens, the theme's page background and its text colour. Because the theme sets that background, Storybook's own background picker is removed from the toolbar.

## Development

This branch uses pnpm and needs Node.js 20.19+ or 22.12+, the minimum for Storybook 10.

```sh
pnpm install
pnpm start
```

`start` builds the addon in watch mode and runs the demo Storybook at http://localhost:6006. Storybook only bundles the manager UI when it starts, so restart it after changing `src/manager.tsx` or `src/styles/manager.scss`.

| Script                 | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `pnpm build`           | Builds the addon into `dist/`                      |
| `pnpm build-storybook` | Builds the demo Storybook into `storybook-static/` |
| `pnpm lint`            | Runs ESLint                                        |
| `pnpm format`          | Formats the code with Prettier                     |

The addon code is in [`src`](./src):

| File                    | What it does                                                  |
| ----------------------- | ------------------------------------------------------------- |
| `manager.tsx`           | Registers the toolbar menu and themes the Storybook UI        |
| `preview.tsx`           | Themes the preview iframe and docs pages                      |
| `theme-state.ts`        | The active theme, shared by the two files above               |
| `storybook-themes.ts`   | The two Storybook themes, built from Carbon tokens            |
| `styles/manager.scss`   | Carbon details for the sidebar, toolbar, panels and menus     |
| `styles/preview.scss`   | Carbon tokens for stories, plus docs page styles              |
| `styles/_controls.scss` | The args table and its controls, shared by the panel and docs |

### Releasing

Releases are cut from `main` with the **Release** workflow, under the repository's Actions tab. Choose `patch`, `minor` or `major` and run it. The workflow bumps the version, publishes that version to npm, pushes the version commit and its tag, and creates a GitHub release.

It publishes through npm's [trusted publishing](https://docs.npmjs.com/trusted-publishers), so there is no access token to store. The package's settings on npmjs.com name this repository and `release.yml` as a trusted publisher.

Each release is also mirrored to GitHub Packages as `@devadula-nandan/storybook-carbon-theme`, which is what the repository's Packages section lists. Install from npm: the copy on GitHub needs a token to install.

## License

[MIT](./LICENSE)
