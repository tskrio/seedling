import { render } from '@redwoodjs/testing'

import StandardLayout from './StandardLayout'

describe('StandardLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StandardLayout />)
    }).not.toThrow()
  })
})
