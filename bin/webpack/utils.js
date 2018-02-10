/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import forEach from 'lodash/forEach'
import isObject from 'lodash/isObject'
export const toJSONString = (object) => {
  const stringObject = {}
  forEach(object, (item, key) => {
    stringObject[key] = JSON.stringify(item)
  })
  return stringObject
}

export const defaultsDeep = (defaultObject = {}, object = {}) => {
  const output = {}
  forEach(defaultObject, (defaultItem, key) => {
    let item = object[key]
    if(isObject(item)){
      item = defaultsDeep(defaultItem, item)
    }
    if(item){
      output[key] = item
    }else{
      output[key] = defaultItem
    }
  })
  return output
}