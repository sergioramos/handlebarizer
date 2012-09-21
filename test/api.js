var assert = require('assert'),
    handlebarizer = require('../'),
    interpolate = require('util').format,
    fs = require('fs')

module.exports = function (callback) {
  handlebarizer(interpolate('%s/templates', __dirname), function (e) {
    assert(!e)
    callback()
  })
}