/* eslint new-cap: 0 */

const macOS = window.require('nodobjc')
const toString = require('./toString')

// Bind macOS as first argument to getter functions
const getPhones = require('./getPhones').bind(this, macOS)
const getEmails = require('./getEmails').bind(this, macOS)
const getUrls = require('./getUrls').bind(this, macOS)
const getAddresses = require('./getAddresses').bind(this, macOS)
const getServices = require('./getServices').bind(this, macOS)
const getSocialProfiles = require('./getSocialProfiles').bind(this, macOS)

/**
 * Convert ABPerson to javascript object
 *
 * @param  {macOS.ABPerson} person
 * @param  {Integer} id Id of person in address book
 * @return {Object}
 */
function serializePerson(person, id) {
  const firstName = toString(person('valueForProperty', macOS.kABFirstNameProperty))
  const lastName = toString(person('valueForProperty', macOS.kABLastNameProperty))
  return {
    id,
    firstName,
    lastName,
    organization: toString(person('valueForProperty', macOS.kABOrganizationProperty)),
    jobTitle: toString(person('valueForProperty', macOS.kABJobTitleProperty)),
    // 1990-06-24 10:00:00 +0000
    birthday: toString(person('valueForProperty', macOS.kABBirthdayProperty)),
    phones: getPhones(person),
    addresses: getAddresses(person),
    emails: getEmails(person),
    services: getServices(person),
    socialProfiles: getSocialProfiles(person),
    urls: getUrls(person)
  }
}

/**
 * Fetch address book from os
 * @return {Promise}
 */
module.exports = () => (
  new Promise(resolve => {
    macOS.framework('AddressBook')
    const addressBook = macOS.ABAddressBook('addressBook')
    const people = addressBook('people')
    const count = people('count')
    const result = []
    for (let i = 0; i < count; i++) {
      const person = serializePerson(people('objectAtIndex', i), i)
      result.push(person)
    }
    resolve(result)
  })
)
