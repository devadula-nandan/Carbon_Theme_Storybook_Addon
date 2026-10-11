import { defineConfig, type Options } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

export default defineConfig(async () => {
  // reading the entries from package.json, which has the following structure:
  // {
  //  ...
  //   "bundler": {
  //     "managerEntries": ["./src/manager.tsx"],
  //     "previewEntries": ["./src/preview.tsx", "./src/index.ts"]
  //   }
  // }
  const packageJson = (await import('./package.json', { with: { type: 'json' } })).default;

  const {
    bundler: { managerEntries = [], previewEntries = [] },
  } = packageJson;

  const commonConfig: Options = {
    /*
     keep this line commented until https://github.com/egoist/tsup/issues/1270 is resolved
     clean: options.watch ? false : true,
    */
    clean: false,
    format: ['esm'],
    treeshake: true,
    splitting: true,
    /*
     The following packages are provided by Storybook and should always be externalized
     Meaning they shouldn't be bundled with the addon, and they shouldn't be regular dependencies either
    */
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

  const configs: Options[] = [];

  /*
   manager entries are entries meant to be loaded into the manager UI
   they'll have manager-specific packages externalized and they won't be usable in node
   they won't have types generated for them as they're usually loaded automatically by Storybook
  */
  if (managerEntries.length) {
    configs.push({
      ...commonConfig,
      entry: managerEntries,
      platform: 'browser',
      target: 'esnext', // we can use esnext for manager entries since Storybook will bundle the addon's manager entries again anyway
    });
  }

  /*
   preview entries are entries meant to be loaded into the preview iframe
   they'll have preview-specific packages externalized and they won't be usable in node
   they'll have types generated for them so they can be imported by users when setting up Portable Stories or using CSF factories
  */
  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      platform: 'browser',
      target: 'esnext', // we can use esnext for preview entries since the builders will bundle the addon's preview entries again anyway
      dts: true,
    });
  }

  return configs;
});
