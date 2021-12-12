import { render } from '@redwoodjs/testing/web'

import LogoutPage from './LogoutPage'

describe('LogoutPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogoutPage />)
    }).not.toThrow()
  })
})
