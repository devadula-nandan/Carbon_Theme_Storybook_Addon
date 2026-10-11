import { useEffect, useState } from 'react';

import { AUTO, DARK, LIGHT, STORAGE_KEY, THEME_ATTRIBUTE, type CarbonTheme, type ThemePreference } from './constants';

// The theme deliberately lives here and not in a Storybook global. Storybook
// re-renders the story and rebuilds the whole docs page whenever a global
// changes, which made every theme switch reset the page. Keeping the state to
// ourselves means a switch only changes an attribute and a theme.
//
// There are two values. The preference is what the user picked: light, dark
// or auto. The theme is what is applied: auto resolves to light or dark from
// the operating system's setting, and follows it while Storybook is open.
//
// The Storybook UI and the preview iframe each load their own copy of this
// module. The UI owns the preference and tells the preview about changes over
// the channel (see EVENTS in constants.ts). Each side resolves it on its own.

type Listener = () => void;

export const isThemePreference = (value: unknown): value is ThemePreference =>
  value === AUTO || value === LIGHT || value === DARK;

const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)');

const resolve = (preference: ThemePreference): CarbonTheme => {
  if (preference !== AUTO) {
    return preference;
  }
  return systemPrefersDark?.matches ? DARK : LIGHT;
};

/** The remembered preference. Without one, the theme follows the system. */
const readStoredPreference = (): ThemePreference => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isThemePreference(stored)) {
      return stored;
    }
  } catch {
    // localStorage can be unavailable, e.g. when cookies are blocked
  }

  return AUTO;
};

export const rememberPreference = (preference: ThemePreference): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // see readStoredPreference
  }
};

let currentPreference = readStoredPreference();
let currentTheme = resolve(currentPreference);
const listeners = new Set<Listener>();

/** Marks the current document with the theme, which is what all the styles key off. */
const applyTheme = (): void => {
  currentTheme = resolve(currentPreference);
  document.documentElement.setAttribute(THEME_ATTRIBUTE, currentTheme);
};

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

applyTheme();

// Auto keeps following the system while Storybook is open.
systemPrefersDark?.addEventListener('change', () => {
  if (currentPreference === AUTO) {
    applyTheme();
    notify();
  }
});

export const getPreference = (): ThemePreference => currentPreference;

export const getTheme = (): CarbonTheme => currentTheme;

export const setPreference = (preference: ThemePreference): void => {
  if (preference === currentPreference) {
    return;
  }
  currentPreference = preference;
  applyTheme();
  notify();
};

/** Calls the listener whenever the preference or the theme changes. */
export const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const useStore = <Value>(read: () => Value): Value => {
  const [value, setValue] = useState(read);

  useEffect(() => {
    const sync = () => setValue(read());
    // The state may have changed between the first render and this effect.
    sync();
    return subscribe(sync);
  }, [read]);

  return value;
};

/** The applied theme, as React state. */
export const useTheme = (): CarbonTheme => useStore(getTheme);

/** The user's preference, as React state. */
export const usePreference = (): ThemePreference => useStore(getPreference);
