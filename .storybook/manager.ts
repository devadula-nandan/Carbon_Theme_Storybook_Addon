import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// The Carbon theme addon takes care of colours, type and shape. Branding stays
// with the project: whatever is set here is kept when the addon applies its theme.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Carbon theme',
    brandUrl: 'https://github.com/devadula-nandan/carbon-theme-storybook-addon',
    brandTarget: '_blank',
  }),
});
