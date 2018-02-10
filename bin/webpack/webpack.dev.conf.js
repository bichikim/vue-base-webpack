/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import webpack from 'webpack'
import getWebpackConfig from './webpack.base.conf'
import margeWebpack from 'webpack-merge'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import {DEVELOPMENT} from './Config'


export default (config) => {
  const webpackBaseConf = getWebpackConfig(config, DEVELOPMENT)
  Object.keys(webpackBaseConf.entry).forEach((key) => {
    webpackBaseConf.entry[key] = ['./hot-client', ...webpackBaseConf.entry[key]]
  })
  return margeWebpack(webpackBaseConf, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin(),
    ],
  })
}
