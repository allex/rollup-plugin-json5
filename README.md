# rollup-plugin-json5

Convert json config files to ES6 modules. default support `*.json`, `.babelrc`

based on [rollup-plugin-json](https://www.npmjs.com/package/rollup-plugin-json)

```js
// import a single property from a JSON file,
// discarding the rest
import { version } from './package.json'
console.log( `running version ${version}` )

// import the whole file as an object
import pkg from './package.json'
console.log( `running version ${pkg.version}` )
```

## Installation

```bash
yarn add -D rollup-plugin-json5
```

## Usage

```js
// rollup.config.js
import json from 'rollup-plugin-json5'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },

  plugins: [
    json({
      // specify json files tester, defaults /\.(json|babelrc)$/
      test: /\.(json|babelrc)$/,

      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      include: 'node_modules/**',
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false

      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  '
    })
  ]
}
```

## License

MIT
