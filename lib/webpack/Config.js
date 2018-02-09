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
    const {
      browsers = [
        "> 1%",
        "last 2 versions",
        "not ie <= 8",
      ],
    } = config
    const defaultStateConfig = {
      publicPath: './',
      babel: {
        plugins: ['lodash'],
        presets: [[
          'evn', {
            modules: false,
            targets: {
              browsers,
            },
          }],
        ],
        ...config.babel,
      },
    }
    const {
      name,
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
      dev = {
        ...defaultStateConfig,
        ...config.dev,
      },
      prod = {
        ...defaultStateConfig,
        ...config.prod,
      },
      test = {
        ...defaultStateConfig,
        ...config.test,
      },
    } = config
    Object.assign(this, {
      name,
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
  
  static isSourceMap(state = PRODUCTION) {
    return state === DEVELOPMENT
  }
  
  static isExtract(state = PRODUCTION) {
    return state === PRODUCTION
  }
}