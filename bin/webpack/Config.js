/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import {defaultsDeep} from './utils'
import defaultConfig from './defaultConfig'
export const DEVELOPMENT = 'dev'
export const PRODUCTION = 'prod'
export const TEST = 'test'

export class Config {
  constructor(_config = {}) {
    const config = defaultsDeep(defaultConfig, _config)
    const
      dev = defaultsDeep(config, _config.dev),
      prod = defaultsDeep(config, _config.prod),
      test = defaultsDeep(config, _config.test)
    Object.assign(this, {
      ...config,
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

  static isSourceMap(state = PRODUCTION) {
    return state === DEVELOPMENT
  }
  
  static isExtract(state = PRODUCTION) {
    return state === PRODUCTION
  }
}