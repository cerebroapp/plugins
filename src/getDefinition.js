// Get dict.py source code using webpack file-loader
const command = require('raw-loader!./dict.py')
const { memoize, shellCommand } = require('cerebro-tools')

// Expire definition cache in 30 minutes
const EXPIRATION = 30 * 60 * 1000

function parseHeader(result) {
  const blocks = result.plain.split('\n\n')
  const header = blocks.shift()
  const plain = blocks.join('\n\n')
  const match = header.match(/^\s*(.*)\s*\|(.+)\|\s*(.*)$/i)
  if (match) {
    return {
      plain,
      header: {
        word: match[1],
        transcription: match[2],
        rest: match[3]
      }
    }
  }
  return {
    plain,
    header: {
      word: header
    }
  }
}

function parseBlocks(result) {
  return {
    ...result,
    plain: '',
    blocks: result.plain.split('\n\n'),
  }
}

function preprocess(stdout) {
  return stdout.replace(/▶/g, '\n\n▶ ')
    .replace(/•/g, '\n• ')
    .replace(/PHRASES/g, '\n\nPHRASES\n')
    .replace(/DERIVATIVES/g, '\n\nDERIVATIVES\n')
    .replace(/ORIGIN/g, '\n\nORIGIN\n')
}

/**
 * Parse result of dict.py execution to proper structure
 *   ** word – defined
 * @param  {String} result Result of execution dict.py
 * @return {Object}
 */
function parseDictionary(stdout) {
  let result = {
    plain: preprocess(stdout)
  }
  result = parseHeader(result)
  result = parseBlocks(result)
  return result
}

/**
 * Get word definition
 * @param  {String} word
 * @return {Object}
 */
function getDefinition(word) {
  return shellCommand(`python -c "${command}" ${word}`).then(parseDictionary)
}

module.exports = memoize(getDefinition, { maxAge: EXPIRATION })
