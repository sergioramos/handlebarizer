var interpolate = require('util').format,
    handlebars = require('handlebars'),
    async = require('async'),
    path = require('path'),
    fs = require('fs')

var template = handlebars.compile(fs.readFileSync(__dirname + '/template.handlebars', 'utf8'))

module.exports = function (directory, callback) {
  directory = path.normalize(directory)
  
  function write (source, name, callback) {
    var file = path.resolve(directory, interpolate('%s.handlebars.js', name))
    fs.writeFile(file, template({template: source, name: name}), callback)
  }
  
  function compile (file, callback) {
    file = path.resolve(directory, file)
    
    fs.readFile(file, 'utf8', function (e, source) {
      if(e) return callback(e)
      write(handlebars.precompile(source), path.basename(file).replace(/\.handlebars$/i, ''), callback)
    })
  }

  var files = fs.readdirSync(directory).filter(function (file) {
    return path.extname(file).match(/\.handlebars/i)
  })
    
  async.forEach(files, compile, function (e) {
    if(e && !callback) throw e
    if(callback) callback(e)
  })
}