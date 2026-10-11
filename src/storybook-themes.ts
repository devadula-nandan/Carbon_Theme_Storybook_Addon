import { g10, g100 } from '@carbon/themes';
import { create, type ThemeVars } from 'storybook/theming';

import { DARK, LIGHT, type CarbonTheme } from './constants';

const FONT_SANS = "'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif";
const FONT_MONO = "'IBM Plex Mono', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', monospace";

type CarbonTokens = typeof g10;

// Storybook runs colour maths on its theme values, so they have to be real
// colours from `@carbon/themes` rather than `var(--cds-*)` references.
//
// A Storybook theme only has a handful of surface colours, so these set the
// broad strokes of the layering described in `styles/_carbon.scss`. The
// stylesheets refine it with Carbon's contextual tokens.

/** Builds the light and dark Storybook themes for one kind of surface. */
const createThemes = (surface: (tokens: CarbonTokens) => Partial<ThemeVars>): Record<CarbonTheme, ThemeVars> => {
  const build = (base: ThemeVars['base'], tokens: CarbonTokens): ThemeVars =>
    create({
      base,

      colorPrimary: tokens.interactive,
      colorSecondary: tokens.interactive,

      appBorderRadius: 0,
      inputBorderRadius: 0,

      fontBase: FONT_SANS,
      fontCode: FONT_MONO,

      textColor: tokens.textPrimary,
      textInverseColor: tokens.textInverse,
      textMutedColor: tokens.textSecondary,

      // Where a story renders. This is the page, so it is always $background.
      appPreviewBg: tokens.background,

      // Secondary surfaces and bars (the toolbar, tab bars) are layer 01.
      appBg: tokens.layer01,
      barBg: tokens.layer01,
      barTextColor: tokens.textSecondary,
      barHoverColor: tokens.textPrimary,
      barSelectedColor: tokens.borderInteractive,

      // Inputs and buttons always end up on a layer 01 surface (a panel or a
      // table), so they use the tokens that pair with it.
      inputBg: tokens.field02,
      inputBorder: tokens.borderStrong02,
      inputTextColor: tokens.textPrimary,
      buttonBg: tokens.layer02,
      buttonBorder: tokens.borderSubtle02,
      booleanBg: tokens.layer02,
      booleanSelectedBg: tokens.layerSelected02,

      ...surface(tokens),
    });

  return { [LIGHT]: build('light', g10), [DARK]: build('dark', g100) };
};

/** The Storybook UI: the sidebar, toolbar and panels are layer 01 surfaces around the canvas. */
export const managerThemes = createThemes((tokens) => ({
  appContentBg: tokens.layer01,
  appHoverBg: tokens.layerHover01,
  appBorderColor: tokens.borderSubtle01,
}));

/** Docs pages: the page is $background, like a story, and its blocks are layers on top. */
export const docsThemes = createThemes((tokens) => ({
  appContentBg: tokens.background,
  appHoverBg: tokens.backgroundHover,
  appBorderColor: tokens.borderSubtle00,
}));
