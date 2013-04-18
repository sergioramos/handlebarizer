# handlebarizer

Solution for compiling handlebars templates into vanilla JS functions for client-side use. Inspired by [HenrikJoreteg/templatizer](https://github.com/HenrikJoreteg/templatizer)

#### example

*template.hbs:*
```hbs
<div>{{name}}</div>
```

*template.hbs.js:*
```js
module.exports = function (Handlebars, depth0, helpers, partials, data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "",
    stack1, foundHelper, functionType = "function",
    escapeExpression = this.escapeExpression;


  buffer += "<div>";
  foundHelper = helpers.name;
  if (foundHelper) {
    stack1 = foundHelper.call(depth0, {
      hash: {}
    });
  } else {
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
  }
  buffer += escapeExpression(stack1) + "</div>";
  return buffer;
};
```

Then the template can be used:
```js
var handlebars = require('handlebars')

var template = handlebars.template(require('./template.hbs.js'))
var html = template({
  name: 'Sérgio Ramos'
})
```

## install

    npm install [-g] handlebarizer

## api

```js
var handlebarizer = require('handlebarizer')

handlebarizer('./templates', function (e) {
  if(e) throw e
  console.log('all templates compiled and saved to disk')
})
```

## cli

```bash
Usage: handlebarizer [options] [command]

Commands:

  compile <path>

Options:

  -h, --help       output usage information
  -V, --version    output the version number
  -r, --recursive  recursively compile throughout the directory tree
```

## license

MIT