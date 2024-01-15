import React from 'react'
import icon from './icon.png'
import translate from './translate'
import detectLanguage from './detectLanguage'
import toLanguageCode from './toLanguageCode'
import Preview from './Preview'
import { Loading } from 'cerebro-ui'
import { id, REGEXP, DISPLAY_NAMES } from './constants.js'

/**
 * Plugin to translate text using yandex translate
 *
 * @param  {String} options.term
 * @param  {Object} options.actions
 * @param  {Function} options.display
 */
export const fn = ({ term, actions, display, config, settings }) => {
  settings = settings || {}
  const match = term.match(REGEXP)
  const userLang = settings.defaultLanguage || config.get('lang')
  if (match) {
    // Show translation in results list
    // TODO: check why using const here throws undefined variable text in production build
    const enteredText = match[1]
    const enteredTargetLang = toLanguageCode(match[2])
    display({
      icon,
      id,
      title: 'Translating...',
      getPreview: () => <Loading />
    })
    if (enteredTargetLang) {
      detectLanguage(enteredText).then(sourceLang =>
        translate(enteredText, `${sourceLang}-${enteredTargetLang}`)
      ).then(({ lang, text }) => {
        const translation = text[0]
        const [sourceLang, targetLang] = lang.split('-')
        const options = {
          text,
          sourceLang,
          targetLang,
          translation,
          userLang
        }
        display({
          id,
          icon,
          title: `${translation}`,
          onSelect: () => {
            const q = encodeURIComponent(text)
            actions.open(`https://translate.yandex.ru/?text=${q}&lang=${lang}`)
          },
          getPreview: () => <Preview {...options} openUrl={actions.open} />
        })
      })
      return
    }
  }

  // Fallback result with lower priority for every request
  display({
    id,
    icon,
    // Low priority for fallback result
    order: 13,
    title: `Translate ${term}`,
    onSelect: () => {
      const q = encodeURIComponent(term)
      actions.open(`https://translate.yandex.ru/?text=${q}`)
    },
    getPreview: () => <Preview key={term} text={term} openUrl={actions.open} userLang={userLang} />
  })
}

export const settings = {
  defaultLanguage: {
    label: 'Default language',
    description: 'By default it is your system language',
    type: 'option',
    options: Object.keys(DISPLAY_NAMES).sort().map(key => ({value: key, label: DISPLAY_NAMES[key]}))
  }
}
