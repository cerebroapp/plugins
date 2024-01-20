const toString = require('./toString')
const convertMacKey = require('./convertMacKey')
const { addressFields, addressLabels } = require('./labelMappings')

/**
 * Get list of person addresses
 *
 * @param  {macOS.ABPerson} person
 * @return {Array}
 */
module.exports = function getAddresses(macOS, person) {
  const addresses = []
  const macAddresses = person('valueForProperty', macOS.kABAddressProperty)
  if (!macAddresses) return addresses
  const count = macAddresses('count')
  for (let i = 0; i < count; i++) {
    const macAddress = macAddresses('valueAtIndex', i)
    const macLabel = toString(macAddresses('labelAtIndex', i))
    const address = {
      label: convertMacKey(macOS, macLabel, addressLabels)
    }
    Object.keys(addressFields).forEach(key => {
      const macKey = macOS[addressFields[key]]
      address[key] = toString(macAddress('objectForKey', macKey))
    })
    addresses.push(address)
  }
  return addresses
}
