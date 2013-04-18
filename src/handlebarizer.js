var interpolate = require('util').format,
    handlebars = require('handlebars'),
    async = require('async'),
    path = require('path'),
    fs = require('fs')

var tmplpath = path.join(path.dirname(__filename), 'template.hbs')
var template = handlebars.compile(fs.readFileSync(tmplpath, 'utf8'))

module.exports = function (directory) {
  directory = path.normalize(directory)

  function write (source, name, extention, callback) {
    var file = path.resolve(directory, interpolate('%s%s.js', name, extention))
    fs.writeFile(file, template({template: source, name: name}), callback)
  }
  
  var extention = function (basename) {
    var extention = basename.match(/\.handlebars$/i)
    if(!extention) extention = basename.match(/\.hbs$$/i)
    return extention.shift()
  }

  function compile (file, callback) {
    file = path.resolve(directory, file)

    fs.readFile(file, 'utf8', function (e, source) {
      if(e) return callback(e)
      var basename = path.basename(file)
      write(handlebars.precompile(source), basename.replace(/\.hbs$|\.handlebars$/i, ''), extention(basename), callback)
    })
  }

  var files = fs.readdirSync(directory).filter(function (file) {
    return path.extname(file).match(/\.handlebars|\.hbs/i)
  })

  async.forEach(files, compile, function (e) {
    if(e) throw e
  })
}