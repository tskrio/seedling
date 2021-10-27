import { render } from '@redwoodjs/testing'

import Standard from './Standard'

describe('Standard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Standard />)
    }).not.toThrow()
  })
})
