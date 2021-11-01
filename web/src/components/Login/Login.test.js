import { render } from '@redwoodjs/testing/web'

import Login from './Login'

describe('Login', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Login />)
    }).not.toThrow()
  })
})
