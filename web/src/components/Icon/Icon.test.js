import { render } from '@redwoodjs/testing/web'

import Icon from './Icon'

describe('Icon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Icon />)
    }).not.toThrow()
  })
})
