import React from 'react';
import { addons, types } from 'storybook/manager-api';

import { Tool } from './components/Tool';
import { ToggleTool } from './components/ToggleTool';
import { ADDON_ID, TOOL_ID, TOGGLE_TOOL_ID } from './constants';
import './styles/manager.scss';

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the carbonize toggle tool
  addons.add(TOGGLE_TOOL_ID, {
    type: types.TOOL,
    title: 'Toggle Carbon Styles',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <ToggleTool />,
  });

  // Register the theme switcher tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Carbon Theme',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <Tool />,
  });
});
