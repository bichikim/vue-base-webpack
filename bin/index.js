/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
// import webpackProdConf from '../lib/webpack/webpack.prod.conf'
import webpackDevConf from './webpack/webpack.dev.conf'
import webpackMerge from 'webpack-merge'
import {Config, DEVELOPMENT, PRODUCTION, TEST} from './webpack/Config'
export default (config, state, webpackConfig = {}) => {
  const conf = new Config(config)
  switch(state){
  case DEVELOPMENT:
    return webpackMerge(webpackDevConf(conf), webpackConfig)
  // case PRODUCTION:
  //   return webpackMerge(webpackProdConf(conf), webpackConfig)
  }
}

export {DEVELOPMENT, PRODUCTION, TEST}
