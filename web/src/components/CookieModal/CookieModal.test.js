import { render } from '@redwoodjs/testing/web'

import CookieModal from './CookieModal'

describe('CookieModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CookieModal />)
    }).not.toThrow()
  })
})
