/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import webpack from 'webpack'
import webpackBaseConf from 'webpack.base.conf'
import margeWebpack from 'webpack-merge'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

import {PRODUCTION} from './Config'
export default (config) => {
  return margeWebpack(webpackBaseConf, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin(),
    ],
  })
}
