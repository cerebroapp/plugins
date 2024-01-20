const React = require('react')
// TODO use component from cerebro-ui when package published
const KeyboardNav = require('./KeyboardNav')
const Block = require('./Block')
const Row = require('./Row')
const styles = require('./styles.css')

/**
 * Convert address object to string
 *
 * @param {Object} address
 * @return {String}
 */
function localeAddress({ street, city, state, zip, country, countryCode }) {
  let address = ''
  if (street) address += `${street}, `
  if (city) address += `${city}`
  if (state) address += `, ${state}`
  if (zip) address += ` ${zip} `
  if (country) address += `, ${country}`
  if (countryCode) address += ` (${countryCode})`
  return address
}

/**
 * Get user name abbreviation (first letter of name and first letter of surname)
 *
 * @param  {Object} user
 * @return {String}
 */
function abbreviation({ firstName, lastName }) {
  return [firstName, lastName].filter(name => !!name).map(
    name => name.toUpperCase()[0]
  ).join('')
}

class Preview extends React.Component {
  /**
   * Render list of label => value dictionary
   * Like phones, emails or urls
   *
   * @param  {Object} list
   * @return {Component}
   */
  renderList(list) {
    const keys = Object.keys(list)
    const rowRenderer = key => (
      <Row
        key={key}
        label={key}
        content={list[key]}
        copyToClipboard={this.props.copyToClipboard}
      />
    )
    return <Block rowRenderer={rowRenderer} list={keys} />
  }
  renderAddresses() {
    const rowRenderer = ({ label, ...address }) => (
      <Row
        key={label}
        label={label}
        content={localeAddress(address)}
        copyToClipboard={this.props.copyToClipboard}
      />
    )
    return <Block rowRenderer={rowRenderer} list={this.props.addresses} />
  }
  renderServices() {
    const rowRenderer = ({ label, serviceName, userName }) => (
      <Row
        key={label}
        label={label}
        content={`${userName} (${serviceName})`}
        copyToClipboard={this.props.copyToClipboard}
      />
    )
    return <Block rowRenderer={rowRenderer} list={this.props.services} />
  }
  renderSocialProfiles() {
    const rowRenderer = ({ url, service }) => (
      <Row
        key={service}
        label={service}
        content={url}
        copyToClipboard={this.props.copyToClipboard}
      />
    )
    return <Block rowRenderer={rowRenderer} list={this.props.socialProfiles} />
  }
  renderBirthday() {
    const { birthday } = this.props
    if (!birthday) return null
    const rowRenderer = (date) => (
      <Row
        key={'birthday'}
        label={'birthday'}
        content={new Date(date).toLocaleDateString()}
        copyToClipboard={this.props.copyToClipboard}
      />
    )
    return <Block rowRenderer={rowRenderer} list={[birthday]} />
  }
  renderHeader() {
    const { firstName, lastName, organization, jobTitle } = this.props
    return (
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            {abbreviation(this.props)}
          </div>
        </div>
        <div className={styles.headerInfo}>
          <div className={styles.name}>
            {firstName} {lastName}
          </div>
          <div className={styles.job}>
            {jobTitle && <div>{jobTitle}</div>}
            {organization && <div>{organization}</div>}
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { phones, emails, urls } = this.props
    return (
      <div className={styles.contact}>
        {this.renderHeader()}
        <KeyboardNav>
          <div className={styles.details}>
            {this.renderList(phones)}
            {this.renderList(emails)}
            {this.renderList(urls)}
            {this.renderBirthday()}
            {this.renderServices()}
            {this.renderSocialProfiles()}
            {this.renderAddresses()}
          </div>
        </KeyboardNav>
      </div>
    )
  }
}

Preview.propTypes = {
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  addresses: React.PropTypes.array,
  services: React.PropTypes.array,
  socialProfiles: React.PropTypes.array,
  phones: React.PropTypes.object,
  emails: React.PropTypes.object,
  urls: React.PropTypes.object,
  copyToClipboard: React.PropTypes.func.isRequired,
  organization: React.PropTypes.string,
  jobTitle: React.PropTypes.string,
  birthday: React.PropTypes.string,
}

module.exports = Preview
