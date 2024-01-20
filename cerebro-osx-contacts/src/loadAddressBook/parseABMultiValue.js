const toString = require('./toString')
const convertMacKey = require('./convertMacKey')

module.exports = (macOS, abMultiValue, labelsMapping) => {
  const result = {}
  if (!abMultiValue) return result
  const count = abMultiValue('count')

  for (let i = 0; i < count; i++) {
    const macLabel = toString(abMultiValue('labelAtIndex', i))
    const value = abMultiValue('valueAtIndex', i)
    if (macLabel && value) {
      const label = convertMacKey(macOS, macLabel, labelsMapping)
      result[label] = toString(value)
    }
  }
  return result
}
