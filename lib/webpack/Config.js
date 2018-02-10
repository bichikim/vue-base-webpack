/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
export const DEVELOPMENT = 'dev'
export const PRODUCTION = 'prod'
export const TEST = 'test'

export class Config {
  constructor(config = {}) {
    const {
      env = {},
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
    } = config
    const mergeStateConfig = (stateConfig = {}) => {
      return {
        ...{
          browsers,
          publicPath,
        },
        ...stateConfig,
        files: {...files, ...stateConfig.files},
        env: {...env, ...stateConfig.env},
        meta: {...meta, ...stateConfig.meta},
        store: {...store, ...stateConfig.store},
        babel: {...babel, ...stateConfig.babel},
        paths: {...paths, ...stateConfig.paths},
      }
    }
    const {
      name = '',
      version = '',
      dev = mergeStateConfig(config.dev),
      prod = mergeStateConfig(config.prod),
      test = mergeStateConfig(config.test),
      serviceWorker = true,
    } = config
    Object.assign(this, {
      name,
      version,
      dev,
      prod,
      test,
      serviceWorker,
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

  static isSourceMap(state = PRODUCTION) {
    return state === DEVELOPMENT
  }
  
  static isExtract(state = PRODUCTION) {
    return state === PRODUCTION
  }
}