import { flow, flatMap, map } from 'lodash/fp'
import { memoize } from 'cerebro-tools'
import getPartOfSpeech from './getPartOfSpeech'
import Preview from './Preview'
import icon from './icon.png'
import { getTranslations } from './api'

const toResult = item => ({
  icon, 
  title: `${item.translation.text} (${getPartOfSpeech(item.partOfSpeechCode)})`,
  subtitle: `${item.originalText} ${item.transcription ? `[${item.transcription}] ` : ''}${item.translation.note}`,
  getPreview: () => <Preview key={item.id} meaningId={item.id} />
})

export const fn = ({ term, display }) => {
  const match = term.match(/eng\s(.+)/)
  if (!match) return
  getTranslations(match[1]).then(flow(
    flatMap(item => item.meanings.map(meaning => ({...meaning, originalText: item.text}))),
    map(toResult),
    display
  ))
}

export const keyword = 'eng'
export const name = 'Search for English word'