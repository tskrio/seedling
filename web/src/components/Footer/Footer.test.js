import { render } from '@redwoodjs/testing/web'

import Footer from './Footer'

describe('Footer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Footer />)
    }).not.toThrow()
  })
})
