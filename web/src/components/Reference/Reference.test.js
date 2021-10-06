import { render } from '@redwoodjs/testing/web'

import Reference from './Reference'

describe('Reference', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Reference />)
    }).not.toThrow()
  })
})
