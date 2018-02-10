/* eslint-disable no-console */
/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import vueBaseWabPack from '../bin'
import config from './config'
import webpack from 'webpack'
const webpackConfig = vueBaseWabPack(config, 'dev')
// console.log(webpackConfig.output)
webpack(webpackConfig, (error, stats) => {
  if(error){
    throw error
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n\n')
})

