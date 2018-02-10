/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import {join} from 'path'
export const DEVELOPMENT = 'dev'
export const PRODUCTION = 'prod'
export const TEST = 'test'

export class Config {
  constructor(config = {}) {
    const mergeStateConfig = (defaultConfig, stateConfig) => {
      const {
        env = {},
        meta = {},
        store = {},
        browsers = [
          "> 1%",
          "last 2 versions",
          "not ie <= 8",
        ],
        babel = {
          plugins: ['lodash'],
          presets: [[
            'evn', {
              modules: false,
              targets: {
                browsers,
              },
            }],
          ],
        },
        publicPath = './',
      } = defaultConfig
      return {
        ...{
          browsers,
          publicPath,
        },
        ...stateConfig,
        env: {...env, ...stateConfig.env},
        meta: {...meta, ...stateConfig.meta},
        store: {...store, ...stateConfig.store},
        babel: {...babel, ...stateConfig.babel},

      }
    }
    const {
      env = {},
      name = '',
      version = '',
      files = {
        indexJs: 'index.js',
        indexHtml: 'index.html',
        indexTemplate: 'index.html',
      },
      paths = {
        root: '/',
        source: '/src/',
        output: '/public/',
        asset: './static/',
        ...config.paths,
      },
      dev = mergeStateConfig(config, config.dev),
      prod = mergeStateConfig(config, config.prod),
      test = mergeStateConfig(config, config.test),
    } = config
    Object.assign(this, {
      env,
      name,
      version,
      files,
      paths,
      dev,
      prod,
      test,
    })
  }
  getStateConfig(state = PRODUCTION) {
    switch(state){
    case DEVELOPMENT:
      return this.dev
    case PRODUCTION:
      return this.prod
    case TEST:
      return this.test
    default:
      return this.prod
    }
  }
  resolve(...path) {
    join(this.path.root, ...path)
  }
  
  babel(state) {
    const config = this.getStateConfig(state)
    return state ? config.babel : this.babel
  }
  
  output(...path) {
    return this.resolve(this.path.output, ...path)
  }
  
  asset(...path) {
    return this.output(this.path.asset, ...path)
  }

  static isDevtool(state = PRODUCTION) {
    return state === DEVELOPMENT ? 'cheap-module-eval-source-map' : false
  }

  static isSourceMap(state = PRODUCTION) {
    return state === DEVELOPMENT
  }
  
  static isExtract(state = PRODUCTION) {
    return state === PRODUCTION
  }
}