const React = require('react')
const Preview = require('./Preview')
const { search } = require('cerebro-tools')
const initializeAsync = require('./initialize')

/**
 * List of all contacts from osx address book
 * @type {Array}
 */
let addressBook = []

/**
 * Get person full name
 *
 * @param  {String} options.firstName
 * @param  {String} options.lastName
 */
const fullName = ({ firstName, lastName }) => (
  [firstName, lastName].filter(name => !!name).join(' ')
)

/**
 * Contacts plugin
 *
 * @param  {[type]} options.term
 * @param  {[type]} options.display [description]
 */
const fn = ({ term, display, actions }) => {
  const result = search(addressBook, term, fullName).map(person => ({
    id: person.id,
    title: fullName(person),
    icon: '/Applications/Contacts.app',
    term: fullName(person),
    // TODO: hackish way to move contacts under other results
    order: 9,
    getPreview: () => <Preview {...person} copyToClipboard={actions.copyToClipboard} />,
  }))
  display(result)
}

module.exports = {
  initializeAsync,
  fn,
  name: 'Contacts',
  onMessage: (contacts) => {
    addressBook = contacts
  }
}
