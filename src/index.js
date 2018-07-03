import JSON5 from 'json5'
import { createFilter, dataToEsm } from 'rollup-pluginutils'

export default function json (options = {}) {
  const filter = createFilter(options.include, options.exclude)
  const indent = 'indent' in options ? options.indent : '\t'
  const test = options.test || ((id) => /\.(json|babelrc)$/.test(id))

  return {
    name: 'json5',

    transform (json, id) {
      if (!test(id) || !filter(id)) {
        return null
      }

      const data = JSON5.parse(json)
      if (Object.prototype.toString.call(data) !== '[object Object]') {
        return { code: `export default ${json};\n`, map: { mappings: '' } }
      }

      return {
        code: dataToEsm(data, { preferConst: options.preferConst, indent }),
        map: { mappings: '' }
      }
    }
  }
}
