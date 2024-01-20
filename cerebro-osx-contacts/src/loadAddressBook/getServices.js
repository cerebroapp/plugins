const toString = require('./toString')
const convertMacKey = require('./convertMacKey')
const { serviceKeys, serviceLabels } = require('./labelMappings')

/**
 * Get list of user messaging services
 *
 * @param  {macOS.ABPerson} person
 * @return {Object}
 */
module.exports = function getServices(macOS, person) {
  const services = []
  const macServices = person('valueForProperty', macOS.kABInstantMessageProperty)
  if (!macServices) return services
  const count = macServices('count')
  for (let i = 0; i < count; i++) {
    const macService = macServices('valueAtIndex', i)
    const userName = macService('objectForKey', macOS.kABInstantMessageUsernameKey)
    const macLabel = toString(macServices('labelAtIndex', i))
    const macServiceName = toString(macService('objectForKey', macOS.kABInstantMessageServiceKey))
    const service = {
      userName: toString(userName),
      serviceName: convertMacKey(macOS, macServiceName, serviceKeys),
      label: convertMacKey(macOS, macLabel, serviceLabels)
    }
    services.push(service)
  }
  return services
}
