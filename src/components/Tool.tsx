import React, { memo, useCallback, useEffect } from 'react';
import { useGlobals } from 'storybook/manager-api';
import { IconButton, WithTooltip, TooltipLinkList } from 'storybook/internal/components';
import { ADDON_ID, THEME_KEY, CARBON_THEMES, type CarbonTheme } from '../constants';

const THEME_LABELS: Record<CarbonTheme, string> = {
  [CARBON_THEMES.WHITE]: 'White',
  [CARBON_THEMES.G10]: 'Gray 10',
  [CARBON_THEMES.G90]: 'Gray 90',
  [CARBON_THEMES.G100]: 'Gray 100',
};

export const Tool = memo(function CarbonThemeSwitcher() {
  const [globals, updateGlobals] = useGlobals();
  const currentTheme = (globals[THEME_KEY] as CarbonTheme) || CARBON_THEMES.WHITE;

  const ThemeIcon = () => {
    return (
      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
        <circle cx="10" cy="12" r="2" />
        <circle cx="16" cy="9" r="2" />
        <circle cx="22" cy="12" r="2" />
        <circle cx="23" cy="18" r="2" />
        <circle cx="19" cy="23" r="2" />
        <path d="M16.54,2A14,14,0,0,0,2,16a4.82,4.82,0,0,0,6.09,4.65l1.12-.31A3,3,0,0,1,13,23.24V27a3,3,0,0,0,3,3A14,14,0,0,0,30,15.46,14.05,14.05,0,0,0,16.54,2Zm8.11,22.31A11.93,11.93,0,0,1,16,28a1,1,0,0,1-1-1V23.24a5,5,0,0,0-5-5,5.07,5.07,0,0,0-1.33.18l-1.12.31A2.82,2.82,0,0,1,4,16,12,12,0,0,1,16.47,4,12.18,12.18,0,0,1,28,15.53,11.89,11.89,0,0,1,24.65,24.32Z" />
      </svg>
    );
  };

  const setTheme = useCallback(
    (theme: CarbonTheme) => {
      updateGlobals({
        [THEME_KEY]: theme,
      });

      // Update the theme attribute on both manager and preview HTML elements
      const managerRoot = document.documentElement;
      const previewIframe = document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;

      if (managerRoot) {
        managerRoot.setAttribute('storybook-carbon-theme', theme);
      }

      if (previewIframe?.contentDocument?.documentElement) {
        previewIframe.contentDocument.documentElement.setAttribute('storybook-carbon-theme', theme);
      }
    },
    [updateGlobals],
  );

  // Set initial theme on mount
  useEffect(() => {
    setTheme(currentTheme);
  }, []);

  const themeOptions = Object.values(CARBON_THEMES).map((theme) => ({
    id: theme,
    title: THEME_LABELS[theme],
    active: currentTheme === theme,
    onClick: () => setTheme(theme),
  }));

  return (
    <WithTooltip placement="top" trigger="click" closeOnOutsideClick tooltip={<TooltipLinkList links={themeOptions} />}>
      <IconButton key={ADDON_ID} title="Change Carbon theme">
        <ThemeIcon />
      </IconButton>
    </WithTooltip>
  );
});
