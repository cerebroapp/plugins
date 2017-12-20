const REGEXP = /lmgt(fy?)?\s(.+)/i

export const keyword = 'lmgt'
export const name = 'Let me google that for you'

export const fn = ({ term, display, actions }) => {
  const match = term.match(REGEXP)
  if (match) {
    const seachTerm = match[2]
    display({
      title: `Let me google ${seachTerm} for you`,
      order: 15,
      onSelect: () => {
        const q = encodeURIComponent(seachTerm)
        actions.open(`http://lmgtfy.com/?q=${q}`)
        actions.hideWindow()
      }
    })
  }
}