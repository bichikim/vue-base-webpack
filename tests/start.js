/* eslint-disable no-console */
/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
// import vueBaseWabPack from '../bin'
// const config = vueBaseWabPack({
//   paths: {
//     root: __dirname,
//   },
//   dev: {
//     serviceWorker: 'service-worker-dev.js',
//   },
// }, 'dev', {})
// console.log(config.module.rules[1])

import {Config} from '../bin/webpack/Config'
const n = new Config({
  name: 'bichi',
  paths: {
    root: '/bichi/',
  },
  dev: {
    paths: {
      root:'/bichi?',
    },
  },
})

console.log(n)
