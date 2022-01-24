import { render } from '@redwoodjs/testing/web'

import ForgotPassword from './ForgotPassword'

describe('ForgotPassword', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForgotPassword />)
    }).not.toThrow()
  })
})
