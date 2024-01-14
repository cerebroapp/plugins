import { memoize } from 'cerebro-tools'

const url = 'https://dictionary.skyeng.ru/api/public/v1'

const memoizeOptions = { 
  maxAge: 60 * 60 * 1000 
}

export const getMeaning = memoize((id) => (
  fetch(`${url}/meanings?ids=${id}`)
    .then(response => response.json())
    .then(json => json[0])
), memoizeOptions)

export const getTranslations = memoize((word) => (
  fetch(`${url}/words/search?search=${word}`).then(response => response.json())
), memoizeOptions)