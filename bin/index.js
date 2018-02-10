/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import webpackBaseConf from '../lib/webpack/webpack.base.conf'
import webpackDevConf from '../lib/webpack/webpack.dev.conf'
import webpackMerge from 'webpack-merge'
import {DEVELOPMENT, PRODUCTION, TEST} from '../lib/webpack/Config'
export default (config, state, webpackConfig = {}) => {
  let _webpackConfig = webpackBaseConf(config, state)
  switch(state){
  case DEVELOPMENT:
    _webpackConfig = webpackMerge(_webpackConfig, webpackDevConf(config))
  }
  return webpackMerge(_webpackConfig, webpackConfig)
}

export {DEVELOPMENT, PRODUCTION, TEST}
