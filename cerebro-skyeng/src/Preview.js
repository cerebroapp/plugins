import React from 'react'
import { Preload, Loading } from 'cerebro-ui'
import { getMeaning } from './api'
import getPartOfSpeech from './getPartOfSpeech'
import styles from './styles.css'

const playSound = (src) => {
  const audio = new Audio(src)
  audio.play()
}

const Meaning = (props) => {
  const { 
    soundUrl, transcription, text, translation, partOfSpeechCode,
    examples, images
  } = props
  return (
    <div className={styles.preview}>
      <h3 className={styles.title}>
        {translation.text}
        {translation.note ? `(${translation.note})` : ``}
      </h3>
      <div className={styles.mainInfo}>
        {text} 
        <span className={styles.transcription}>|{transcription}|</span>
        {soundUrl && <button className={styles.soundButton} tabIndex={0} onClick={() => playSound(`https:${soundUrl}`)} /> }
      </div>
      <div className={styles.partOfSpeech}>{getPartOfSpeech(partOfSpeechCode)}</div>
      <ol className={styles.examples}>
        {
          examples.map(e => (
            <li className={styles.example}>
              {e.text}
              {e.soundUrl && <button className={styles.soundButton} tabIndex={0} onClick={() => playSound(`https:${e.soundUrl}`)} /> }
            </li>
          ))
        }
      </ol>
      <div className={styles.images}>
        {images.map(img => <img src={`https:${img.url}`} />)}
      </div>
    </div>
  )
}

export default ({ meaningId }) => (
  <Preload loader={<Loading />} promise={getMeaning(meaningId)}>
    { (meaning) => <Meaning {...meaning} /> }
  </Preload>
)