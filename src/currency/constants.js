/* eslint quote-props: 0 */

/**
 * List of all supported currencies
 * @type {Array}
 */
module.exports.CURRENCIES = [
  'aud', 'bgn', 'brl', 'cad', 'chf', 'cny',
  'czk', 'dkk', 'eur', 'gbp', 'hkd', 'hrk',
  'huf', 'idr', 'ils', 'inr', 'jpy', 'krw',
  'mxn', 'myr', 'nok', 'nzd', 'php', 'pln',
  'ron', 'rub', 'sek', 'sgd', 'thb', 'try',
  'uah', 'usd', 'zar', 'btc', 'clp'
]

/**
 * Array of prioritized currencies
 * @type {Array}
 */
module.exports.PRIORITY_CURRENCIES = [
  'rub',
  'usd',
  'eur'
]

/**
 * Hash of currencies by locale countries
 * @type {Object}
 */
module.exports.CURRENCY_BY_COUNTRY = {
  'AU': 'aud',
  'BR': 'brl',
  'US': 'usd',
  'CA': 'cad',
  'CH': 'chf',
  'CL': 'clp',
  'CN': 'cny',
  'GB': 'gbp',
  'HK': 'hkd',
  'KR': 'krw',
  'NZ': 'nzd',
  'PH': 'php',
  'RU': 'rub',
  'SG': 'sgd',
  'UA': 'uah',
  'ZA': 'zar',
  'AD': 'eur',
  'AT': 'eur',
  'AX': 'eur',
  'BE': 'eur',
  'BL': 'eur',
  'CY': 'eur',
  'DE': 'eur',
  'EE': 'eur',
  'ES': 'eur',
  'FI': 'eur',
  'FR': 'eur',
  'GF': 'eur',
  'GP': 'eur',
  'GR': 'eur',
  'IE': 'eur',
  'IT': 'eur',
  'LU': 'eur',
  'MC': 'eur',
  'ME': 'eur',
  'MF': 'eur',
  'MQ': 'eur',
  'MT': 'eur',
  'NL': 'eur',
  'PM': 'eur',
  'PT': 'eur',
  'RE': 'eur',
  'SI': 'eur',
  'SK': 'eur',
  'SM': 'eur',
  'TF': 'eur',
  'VA': 'eur',
  'YT': 'eur',
  'IL': 'ils',
  'IN': 'inr'
}

/**
 * Hash of currencies by locale language
 * @type {Object}
 */
module.exports.CURRENCY_BY_LANG = {
  'bg': 'bgn',
  'cs': 'czk',
  'da': 'dkk',
  'hr': 'hrk',
  'hu': 'huf',
  'id': 'idr',
  'he': 'ils',
  'hi': 'inr',
  'ja': 'jpy',
  'ms': 'myr',
  'nb': 'nok',
  'nn': 'nok',
  'no': 'nok',
  'ru': 'rub',
}

/**
 * Object of synonims of currencies for better matching them in search queries
 * @type {Object}
 */
module.exports.SYNONIMS = {
  'франк*': 'chf',
  'franc*': 'chf',
  '₣': 'chf',

  'real*': 'brl',
  'реал*': 'brl',

  'kun*': 'hrk',
  'кун*': 'hrk',

  'форинт*': 'huf',
  'forint*': 'huf',

  '₹': 'inr',
  'rs': 'inr',
  'rupee*': 'inr',

  'ringgit*': 'myr',
  'ринггит*': 'myr',

  '฿': 'thb',
  'baht': 'thb',
  'бат*': 'thb',
  'bat*': 'thb',

  'lir*': 'try',
  'лир*': 'try',

  'rand*': 'zar',
  'рэнд*': 'zar',
  'ренд*': 'zar',

  'zlot*': 'pln',
  'злот*': 'pln',

  '₴': 'uah',
  'грн': 'uah',
  'грив*': 'uah',

  'bucks': 'usd',
  '$': 'usd',
  'dollar*': 'usd',
  'долл*': 'usd',

  '€': 'eur',
  'eur*': 'eur',
  'евро': 'eur',

  '£': 'gbp',
  'фунт*': 'gbp',
  'pound*': 'gbp',

  '₽': 'rub',
  'руб': 'rub',
  'рубл*': 'rub',

  '₪': 'ils',
  'шекел*': 'ils',

  'йен*': 'jpy',

  'юан*': 'cny',
  'yuan': 'cny',

  'bitc*': 'btc',
  'битко*': 'btc'
}

/**
 * Hash of special display names for some currencies. Default name of currency displayed
 * @type {Object}
 */
module.exports.DISPLAY_NAMES = {
  'usd': '$',
  'eur': '€',
  'gbp': '£',
  'rub': '₽',
  'uah': '₴',
  'ils': '₪',
  'chf': '₣',
  'thb': '฿',
  'inr': '₹'
}
