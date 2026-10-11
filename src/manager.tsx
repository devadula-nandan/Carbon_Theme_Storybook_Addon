import React from 'react';
import { addons, types } from 'storybook/manager-api';
import type { ThemeVars } from 'storybook/theming';

import { ThemeSelect } from './components/ThemeSelect';
import { ADDON_ID, EVENTS, TOOL_ID } from './constants';
import { managerThemes } from './storybook-themes';
import { getPreference, getTheme, subscribe } from './theme-state';
import './styles/manager.scss';

/** The Storybook theme for the active Carbon theme. */
const getStorybookTheme = (): ThemeVars => {
  // Keep whatever branding the project configured in its own manager theme.
  const { brandTitle, brandUrl, brandImage, brandTarget } = addons.getConfig().theme ?? {};
  return { ...managerThemes[getTheme()], brandTitle, brandUrl, brandImage, brandTarget };
};

// Set a theme straight away so the UI doesn't flash unthemed while it boots.
// Storybook hasn't started yet, so this only records the theme in its config.
addons.setConfig({ theme: getStorybookTheme() });

addons.register(ADDON_ID, (api) => {
  const applyStorybookTheme = (): void => {
    const theme = getStorybookTheme();

    // Storybook re-applies its config whenever any addon changes it, so keep
    // the theme in there current. Assigning it avoids `addons.setConfig`,
    // which would announce a config change and make Storybook reset the
    // sidebar and panel sizes to what they were when the page loaded.
    addons.getConfig().theme = theme;

    // Switch the theme through the store instead, which only touches the theme.
    api.setOptions({ theme });
  };

  // By now the project's own manager config has run. Apply the theme again so
  // the Carbon colours win while any branding it set is picked up.
  applyStorybookTheme();
  subscribe(applyStorybookTheme);

  // The preview asks for the preference whenever it loads or reloads.
  api.on(EVENTS.REQUEST, () => api.emit(EVENTS.CHANGE, getPreference()));

  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Carbon theme',
    match: ({ viewMode, tabId }) => !tabId && (viewMode === 'story' || viewMode === 'docs'),
    render: () => <ThemeSelect />,
  });
});
