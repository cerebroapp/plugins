const React = require('react')
const Loading = require('./Loading')
const parseMeta = require('./parseMeta')
const styles = require('./styles.css')

class Preview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      meta: {},
    }
  }
  componentDidMount() {
    this.updateMeta(this.props.url)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loaded: false })
    this.updateMeta(nextProps.url)
  }
  updateMeta(url) {
    parseMeta(url).then(meta => {
      this.setState({
        meta,
        loaded: true,
      })
    })
  }
  renderMeta() {
    const { meta } = this.state
    return (
      <div className={styles.meta}>
        {meta.image &&
          <div className={styles.imageWrapper}>
            <img src={meta.image} alt={''} className={styles.image} />
          </div>
        }
        <div className={styles.details}>
          {meta.title && <div className={styles.title}>{meta.title}</div>}
          {meta.description && <p className={styles.description}>{meta.description}</p>}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.preview}>
        <div className={styles.explanation}>
          <span className={styles.return}>↩</span> to open URL in default browser
        </div>
        {this.state.loaded ? this.renderMeta() : <Loading />}
      </div>
    )
  }
}

Preview.propTypes = {
  url: React.PropTypes.string.isRequired
}

module.exports = Preview
