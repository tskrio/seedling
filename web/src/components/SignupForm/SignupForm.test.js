import { render } from '@redwoodjs/testing/web'

import SignupForm from './SignupForm'

describe('SignupForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignupForm />)
    }).not.toThrow()
  })
})
