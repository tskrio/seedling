import { render } from '@redwoodjs/testing/web'

import ForgotPassword from './ForgotPasswordForm'

describe('ForgotPassword', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForgotPassword />)
    }).not.toThrow()
  })
})
