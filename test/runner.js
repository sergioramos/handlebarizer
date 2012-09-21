var interpolate = require('util').format,
    fs = require('fs'),
    path = require('path'),
    async = require('async')

var clean = Array.prototype.forEach.bind(fs.readdirSync(interpolate('%s/templates', __dirname)).filter(function (file) {
  return path.extname(file) === '.js'
}), function (template) {
  fs.unlinkSync(interpolate('%s/templates/%s', __dirname, template))
})

async.forEachSeries(fs.readdirSync(__dirname).filter(function (file) {
  return path.extname(file) === '.js' && file !== 'runner.js'
}), function (file, callback) {
  clean()
  require(interpolate('./%s', file))(callback)
}, clean)