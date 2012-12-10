# handlebarizer

Solution for compiling handlebars templates into vanilla JS functions for client-side use. Inspired by [HenrikJoreteg/templatizer](https://github.com/HenrikJoreteg/templatizer)

## install

    npm install [-g] handlebarizer

## usage

The templates are compiled to be used with [component(1)](http://github.com/component/component)

### api

```js
var handlebarizer = require('handlebarizer')

handlebarizer('./templates', function (e) {
  if(e) throw e
  console.log('all templates compiled and saved in disk')
})
```

### cli

```bash
λ handlebarizer compile <path>
```

## license

MIT