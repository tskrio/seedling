import { render } from '@redwoodjs/testing/web'

import ResetPasswordForm from './ResetPasswordForm'

describe('ResetPasswordForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResetPasswordForm />)
    }).not.toThrow()
  })
})
