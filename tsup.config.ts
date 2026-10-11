import { defineConfig, type Options } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

// Both bundles run in the browser and are bundled again by Storybook, so they
// stay as modern ES modules. `storybook` and `@storybook/addon-docs` are peer
// dependencies, which tsup leaves out of the bundles by itself.
const shared: Options = {
  // `pnpm build` empties dist/ first. Cleaning here as well would break watch
  // mode, where the two bundles are rebuilt independently.
  clean: false,
  format: ['esm'],
  platform: 'browser',
  target: 'esnext',
  treeshake: true,
  splitting: true,
  // Storybook provides these at runtime.
  external: ['react', '@storybook/icons'],
  esbuildPlugins: [
    sassPlugin({
      type: 'style',
      // Carbon's own Sass still triggers deprecation warnings that we can't act on here
      quietDeps: true,
      silenceDeprecations: ['if-function'],
    }),
  ],
};

export default defineConfig([
  // Loaded into the Storybook UI.
  { ...shared, entry: ['src/manager.tsx'] },
  // Loaded into the preview iframe. Projects can import these, so they get type declarations.
  { ...shared, entry: ['src/preview.tsx', 'src/index.ts'], dts: true },
]);
