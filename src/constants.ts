export const ADDON_ID = 'storybook-carbon-theme';
export const TOOL_ID = `${ADDON_ID}/tool`;
export const TOGGLE_TOOL_ID = `${ADDON_ID}/toggle-tool`;
export const THEME_KEY = 'carbonTheme';
export const CARBONIZE_KEY = 'carbonizeStorybook';

export const CARBON_THEMES = {
  WHITE: 'white',
  G10: 'g10',
  G90: 'g90',
  G100: 'g100',
} as const;

export type CarbonTheme = (typeof CARBON_THEMES)[keyof typeof CARBON_THEMES];
