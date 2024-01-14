const partsOfSpeech = {
  'n': 'noun',
  'v': 'verb',
  'j': 'adjective',
  'r': 'adverb',
  'prp': 'preposition',
  'prn': 'pronoun',
  'crd': 'cardinal number',
  'cjc': 'conjunction',
  'exc': 'interjection',
  'det': 'determiner',
  'ph0': 'phrase',
  'ph1': 'phrase',
  'abb': 'abbreviation',
  'ord': 'ordinal number',
  'md': 'modal verb',
  'ph': 'phrase',
  'phi': 'idiom',
  'phl': 'linking words',
  'phv': 'vague language',
  'phf': 'fixed phrases'
}

export default (code) => partsOfSpeech[code]