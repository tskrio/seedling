import { render } from '@redwoodjs/testing'

import LoginComponent from './LoginComponent'

describe('LoginComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginComponent />)
    }).not.toThrow()
  })
})
