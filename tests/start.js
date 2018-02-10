/* eslint-disable no-console */
/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import vueBaseWabPack from '../bin'
const config = vueBaseWabPack({}, 'dev', {})
console.log(config.output)
