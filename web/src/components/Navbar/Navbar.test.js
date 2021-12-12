import { render } from '@redwoodjs/testing/web'

import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Navbar />)
    }).not.toThrow()
  })
})
