import { defineMain } from '@storybook/react-vite/node';

const config = defineMain({
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', import.meta.resolve('./local-preset.ts')],
  framework: '@storybook/react-vite',
  // This Storybook loads the addon from dist/. Vite's dev server leaves its
  // build output folder unwatched, and that folder defaults to dist/, so a
  // rebuilt addon would never show up. Turning off emptyOutDir lifts that.
  viteFinal: (viteConfig, { configType }) =>
    configType === 'DEVELOPMENT' ? { ...viteConfig, build: { ...viteConfig.build, emptyOutDir: false } } : viteConfig,
});

export default config;
