export const ADDON_ID = 'storybook-carbon-theme';
export const TOOL_ID = `${ADDON_ID}/theme`;

/** Channel events that keep the preview in step with the Storybook UI. */
export const EVENTS = {
  /** Sent by the Storybook UI, with the theme preference, whenever it changes. */
  CHANGE: `${ADDON_ID}/change`,
  /** Sent by the preview when it loads, to ask the Storybook UI for the current preference. */
  REQUEST: `${ADDON_ID}/request`,
} as const;

/** Attribute set on `<html>` in both the Storybook UI and the preview iframe. */
export const THEME_ATTRIBUTE = 'data-carbon-theme';

/** `localStorage` key used to remember the theme preference. */
export const STORAGE_KEY = ADDON_ID;

/** Carbon theme used for light mode. */
export const LIGHT = 'g10';

/** Carbon theme used for dark mode. */
export const DARK = 'g100';

/** Follow the operating system's light or dark setting. */
export const AUTO = 'auto';

/** A theme that is actually applied. */
export type CarbonTheme = typeof LIGHT | typeof DARK;

/** What the user picked: a theme, or leaving it to the system. */
export type ThemePreference = CarbonTheme | typeof AUTO;
