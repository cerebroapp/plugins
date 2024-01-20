const React = require('react')
// TODO use component from cerebro-ui when package published
const KeyboardNavItem = require('./KeyboardNavItem')
const styles = require('./styles.css')

/**
 * Render label and value for some user property
 *
 * @param  {String} options.label
 * @param  {String} options.content
 * @return {Component}
 */
class Row extends React.Component {
  constructor(props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }
  onKeyDown(event) {
    const { metaKey, ctrlKey, keyCode } = event
    if ((metaKey || ctrlKey) && keyCode === 67) {
      // Copy value to clipboard by cmd/ctrl+c
      this.props.copyToClipboard(this.props.content)
      event.preventDefault()
    }
  }
  render() {
    const { label, content, copyToClipboard } = this.props
    return (
      <KeyboardNavItem onSelect={() => copyToClipboard(content)} onKeyDown={this.onKeyDown}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{content}</div>
      </KeyboardNavItem>
    )
  }
}

Row.propTypes = {
  copyToClipboard: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  content: React.PropTypes.string,
}

module.exports = Row
