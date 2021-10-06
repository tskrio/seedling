import { render } from '@redwoodjs/testing/web'

import TimeTag from './TimeTag'

describe('TimeTag', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimeTag />)
    }).not.toThrow()
  })
})
