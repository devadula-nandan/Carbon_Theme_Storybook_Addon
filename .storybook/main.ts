import { defineMain } from '@storybook/react-vite/node';

const config = defineMain({
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  // `storybook-carbon-theme` is this package itself. The demo registers the
  // addon the way a project would, and Storybook loads it from dist/.
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', 'storybook-carbon-theme'],
  framework: '@storybook/react-vite',
  // Vite's dev server leaves its build output folder unwatched, and that
  // folder defaults to dist/, so a rebuilt addon would never show up. Turning
  // off emptyOutDir lifts that.
  viteFinal: (viteConfig, { configType }) =>
    configType === 'DEVELOPMENT' ? { ...viteConfig, build: { ...viteConfig.build, emptyOutDir: false } } : viteConfig,
});

export default config;
