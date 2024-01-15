/* eslint no-eval: 0 */

const React = require('react')
const Preview = require('./Preview')
const icon = require('./icon.png')

const MATH_REGEXP = /^[-+/*\d\s,\.\( )]+$/

/**
 * Plugin to show result of math calculation
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const mathPlugin = ({ term, display }) => {
  const match = term.match(MATH_REGEXP)
  if (match) {
    try {
      let result = eval(term.replace(/,/g, '.'))
      if (Number.isNaN(result)) {
        // When user tries to devide 0 by 0
        display({
          icon,
          title: '= indeterminate',
          getPreview: () => <Preview />
        })
        return
      }
      result = result.toLocaleString()
      display({
        icon,
        title: `= ${result}`,
        term: `${term} = ${result}`,
        clipboard: result,
      })
    } catch (err) {
      // Do nothing when eval failed
    }
  }
}
module.exports = {
  fn: mathPlugin,
  icon: icon
}
