const path = require('path');
const process = require('process');

module.exports = function babelConfig(api) {
  api.cache.forever();

  return {
    env: {
      development: {
        plugins: [
          [
            '@emotion',
            {sourceMap: true},
          ],
          // This causes test ids used in tests not to appear in development
          ['react-remove-properties', {properties: ['data-testid']}],
          [
            'babel-plugin-named-asset-import',
            {loaderMap: {svg: {ReactComponent: '@svgr/webpack?+svgo,+titleProp,+ref![path]'}}},
          ],
        ],
      },
      production: {
        plugins: [
          ['@emotion'],
          // This causes test ids used in tests not to appear in production
          ['react-remove-properties', {properties: ['data-testid']}],
          [
            'babel-plugin-named-asset-import',
            {loaderMap: {svg: {ReactComponent: '@svgr/webpack?+svgo,+titleProp,+ref![path]'}}},
          ],
        ],
      },
      test: {
        plugins: [
          ['@emotion'],
          ['dynamic-import-node', {noInterop: true}],
        ],
      },
    },
    plugins: [
      '@babel/syntax-dynamic-import',
      [
        'module-resolver', {
          resolvePath(source, currentFile) {
            if (source.match(/^[_#]/u)) {
              if (source.match(/^__|##/u)) {
                if (currentFile.match(/^.*\/modules\/[^\/]+$/u)) {
                  return source;
                }
                const root = currentFile.replace(/^(.*\/modules\/[^\/]*)\/.*/u, '$1');
                const filePath = currentFile;
                const slashes = filePath.replace(root, '').match(/\//ug).length;
                const relativeRoot = (slashes === 1 ? './' : (new Array(slashes - 1).fill('../')).join('')) +
                  (source.startsWith('#') ? 'components/' : '');

                return relativeRoot + source.substr(3);
              }
              else if (source.match(/^[_#]/u)) {
                const root = path.join(process.cwd(), 'src');
                const filePath = currentFile;
                const slashes = filePath.replace(root, '').match(/\//ug).length;
                const relativeRoot = (slashes === 1 ? './' : (new Array(slashes - 1).fill('../')).join('')) +
                  (source.startsWith('#') ? 'lib/components/' : 'lib/');

                return relativeRoot + source.substr(2);
              }
            }

            return source;
          },
          transformFunctions: ['mockModule'],
        },
      ],
    ],
    presets: [['react-app', {"runtime": "automatic"}]],
  };
};