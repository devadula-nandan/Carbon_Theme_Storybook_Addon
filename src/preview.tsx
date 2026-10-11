import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';
import { addons } from 'storybook/preview-api';

import { CarbonDocsContainer } from './components/DocsContainer';
import { EVENTS } from './constants';
import { isThemePreference, setPreference } from './theme-state';
import './styles/preview.scss';

// Follow the theme preference of the Storybook UI. This goes over the channel
// and not through a decorator or a global, so a switch never re-renders a story.
const channel = addons.getChannel();
channel.on(EVENTS.CHANGE, (preference: unknown) => {
  if (isThemePreference(preference)) {
    setPreference(preference);
  }
});
channel.emit(EVENTS.REQUEST);

const preview: ProjectAnnotations<Renderer> = {
  parameters: {
    // The Carbon theme sets the canvas background, so there is nothing to pick
    // from. With no options, Storybook drops its background picker from the toolbar.
    backgrounds: {
      options: {},
    },
    docs: {
      container: CarbonDocsContainer,
    },
  },
};

export default preview;
