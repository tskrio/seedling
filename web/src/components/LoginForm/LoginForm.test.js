import { render } from '@redwoodjs/testing/web'

import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginForm />)
    }).not.toThrow()
  })
})
