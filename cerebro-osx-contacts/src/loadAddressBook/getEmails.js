const parseABMultiValue = require('./parseABMultiValue')
const { emailLabels } = require('./labelMappings')

/**
 * Get list of user emails
 *
 * @param  {macOS.ABPerson} person
 * @return {Object}
 */
module.exports = function getEmails(macOS, person) {
  const macEmails = person('valueForProperty', macOS.kABEmailProperty)
  return parseABMultiValue(macOS, macEmails, emailLabels)
}
