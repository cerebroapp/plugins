const parseABMultiValue = require('./parseABMultiValue')
const { phoneLabels } = require('./labelMappings')

/**
 * Get list of user phones
 *
 * @param  {macOS.ABPerson} person
 * @return {Object}
 */
module.exports = function getPhones(macOS, person) {
  const macPhones = person('valueForProperty', macOS.kABPhoneProperty)
  return parseABMultiValue(macOS, macPhones, phoneLabels)
}
