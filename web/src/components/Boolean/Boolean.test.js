import { render } from '@redwoodjs/testing/web'

import Boolean from './Boolean'

describe('Boolean', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Boolean />)
    }).not.toThrow()
  })
})
