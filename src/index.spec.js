import { fn } from './index'
import renderer from 'react-test-renderer'

describe('Math plugin', () => {

  it('callback is not called when term is noth math expression', () => {
    const term = 'hello how are you'
    const display = jest.fn()
    fn({ term, display })
    expect(display).not.toBeCalled()
  })

  it('callback called with correct object', () => {
    const term = '5 + 6'
    const display = jest.fn()
    fn({ term, display })
    expect(display).toBeCalledWith({
      icon: 'icon.png',
      clipboard: '11',
      title: '= 11',
      term: '5 + 6 = 11'
    })
  })

  it('formats infinity', () => {
    const term = '1 / 0'
    const display = jest.fn()

    fn({ term, display })
    expect(display).toBeCalledWith({
      icon: 'icon.png',
      clipboard: '∞',
      title: '= ∞',
      term: '1 / 0 = ∞'
    })
  })

  it('shows indeterminate', () => {
    const term = '0 / 0'
    const display = jest.fn()
    fn({ term, display })

    expect(display).toBeCalledWith(expect.objectContaining({
      icon: 'icon.png',
      title: '= indeterminate'
    }))
  })

  it('indeterminate results shows details', () => {
    const term = '0 / 0'
    const display = ({ getPreview }) => {
      const tree = renderer.create(getPreview())
      expect(tree).toMatchSnapshot()
    }
    fn({ term, display })
  })

  describe('with complex expressions: ', () => {
    it('executed several operations', () => {
      const term = '5 * 6 - 10'
      const display = jest.fn()
      fn({ term, display })
      expect(display).toBeCalledWith(expect.objectContaining({
        title: "= 20",
        clipboard: '20'
      }))
    })

    it('uses brackets', () => {
      const term = '5 * (6 - 10)'
      const display = jest.fn()
      fn({ term, display })
      expect(display).toBeCalledWith(expect.objectContaining({
        title: '= -20'
      }))
    })

    it('calculates floats', () => {
      const term = '1.1 + 3.2'
      const display = jest.fn()
      fn({ term, display })
      expect(display).toBeCalledWith(expect.objectContaining({
        title: '= 4.3'
      }))
    })

    it('floats with commas', () => {
      const term = '1,1 + 3,2'
      const display = jest.fn()
      fn({ term, display })
      expect(display).toBeCalledWith(expect.objectContaining({
        title: '= 4.3'
      }))
    })

    it('handles negatives', () => {
      const term = '-10 + 60'
      const display = jest.fn()
      fn({ term, display })
      expect(display).toBeCalledWith(expect.objectContaining({
        title: '= 50'
      }))
    })
  })
})
