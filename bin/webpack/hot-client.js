/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
require('eventsource-polyfill')
/* this is must var for ie 9 10*/
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function(event) {
  if(event.action === 'reload'){
    window.location.reload()
  }
})
