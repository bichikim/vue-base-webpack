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
webpack(webpackConfig)

