import React, { memo, useCallback } from 'react';
import { ContrastIcon, MoonIcon, SunIcon } from '@storybook/icons';
import { Select } from 'storybook/internal/components';
import { useStorybookApi } from 'storybook/manager-api';

import { AUTO, DARK, EVENTS, LIGHT, type ThemePreference } from '../constants';
import { isThemePreference, rememberPreference, setPreference, usePreference } from '../theme-state';

const ICONS: Record<ThemePreference, React.ReactNode> = {
  [AUTO]: <ContrastIcon />,
  [LIGHT]: <SunIcon />,
  [DARK]: <MoonIcon />,
};

const OPTIONS = [
  { value: AUTO, title: 'Auto', description: 'Follows your system setting', icon: ICONS[AUTO] },
  { value: LIGHT, title: 'Light', description: 'Carbon Gray 10', icon: ICONS[LIGHT] },
  { value: DARK, title: 'Dark', description: 'Carbon Gray 100', icon: ICONS[DARK] },
];

/** Toolbar menu for the Carbon theme: light, dark, or whatever the system is set to. */
export const ThemeSelect = memo(function ThemeSelect() {
  const api = useStorybookApi();
  const preference = usePreference();

  const select = useCallback(
    (value: unknown) => {
      if (!isThemePreference(value)) {
        return;
      }
      rememberPreference(value);
      setPreference(value);
      api.emit(EVENTS.CHANGE, value);
    },
    [api],
  );

  return (
    <Select
      ariaLabel="Carbon theme"
      tooltip="Change Carbon theme"
      padding="small"
      icon={ICONS[preference]}
      options={OPTIONS}
      defaultOptions={preference}
      onSelect={select}
    />
  );
});
