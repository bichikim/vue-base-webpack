/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import forEach from 'lodash/forEach'
export const toJSONString = (object) => {
  const stringObject = {}
  forEach(object, (item, key) => {
    stringObject[key] = JSON.stringify(item)
  })
  return stringObject
}
