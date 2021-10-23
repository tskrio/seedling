import { render } from '@redwoodjs/testing/web'

import Button from './Button'

describe('Button', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Button />)
    }).not.toThrow()
  })
})
