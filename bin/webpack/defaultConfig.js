/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import browsers from './browserConfig'

export default {
  name: '',
  version: '',
  vendor: [],
  serviceWorker: false,
  publicPath: '/',
  env: {},
  meta: {},
  store: {},
  browsers,
  paths: {
    root: '/',
    source: './src/',
    output: './public/',
    asset: './static/',
  },
  files: {
    indexJs: 'index.js',
    indexHtml: 'index.html',
    indexTemplate: 'index.html',
  },
  postcss: {

  },
  babel: {
    plugins: ['lodash'],
    presets: [[
      'env', {
        modules: false,
        targets: {
          browsers,
        },
      }],
    ],
  },
}
