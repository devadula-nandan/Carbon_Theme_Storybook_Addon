import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';
import { useEffect, useGlobals } from 'storybook/preview-api';
import type { DecoratorFunction } from 'storybook/internal/types';

import { THEME_KEY, CARBON_THEMES, CARBONIZE_KEY } from './constants';
import './styles/preview.scss';

/**
 * Decorator that syncs the Carbon theme and carbonize state to the preview iframe's HTML element
 */
const withCarbonTheme: DecoratorFunction = (StoryFn) => {
  const [globals] = useGlobals();
  const theme = globals[THEME_KEY] || CARBON_THEMES.WHITE;
  const isCarbonized = globals[CARBONIZE_KEY] === true;

  useEffect(() => {
    const root = document.documentElement;
    if (root) {
      root.setAttribute('storybook-carbon-theme', theme);

      if (isCarbonized) {
        root.setAttribute('data-carbonize', 'true');
      } else {
        root.removeAttribute('data-carbonize');
      }
    }
  }, [theme, isCarbonized]);

  return StoryFn();
};

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withCarbonTheme],
  initialGlobals: {
    [THEME_KEY]: CARBON_THEMES.WHITE,
    [CARBONIZE_KEY]: false,
  },
};

export default preview;
