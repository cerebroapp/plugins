const React = require('react')
const uniq = require('lodash/uniq')
const Preview = require('./Preview')

const URL_REGEXP = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

// Cache used urls to autocomplete them
let lastUrls = []

function matchedUsedUrls(term) {
  return lastUrls.filter(url => url.replace(/^https?:\/\//, '').indexOf(term) === 0)
}

function toResult(url, open) {
  return {
    title: url,
    subtitle: 'Open url',
    term: url,
    onSelect: () => {
      lastUrls = uniq([url, ...lastUrls])
      open(url)
    },
    getPreview: () => <Preview url={url} />
  }
}

/**
 * Plugin to open entered url in default browser
 *
 * @param  {String} options.term
 * @param  {Object} options.actions
 * @param  {Function} options.display
 */
const fn = ({ term, actions, display }) => {
  const match = term.match(URL_REGEXP)
  if (match) {
    let url = term
    if (!term.match(/^https?:\/\//)) {
      url = `http://${url}`
    }
    display(toResult(url, actions.open))
  }
  const result = matchedUsedUrls(term).map(url => toResult(url, actions.open))
  display(result)
}

module.exports = {
  fn: fn,
}
