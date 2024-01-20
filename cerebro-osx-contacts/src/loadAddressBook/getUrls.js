const parseABMultiValue = require('./parseABMultiValue')
const { urlLabels } = require('./labelMappings')

/**
 * Get list of user urls
 *
 * @param  {macOS.ABPerson} person
 * @return {Object}
 */
module.exports = function getUrls(macOS, person) {
  const macUrls = person('valueForProperty', macOS.kABURLsProperty)
  return parseABMultiValue(macOS, macUrls, urlLabels)
}
