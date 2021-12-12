import { render } from '@redwoodjs/testing/web'

import TableRows from './TableRows'

describe('TableRows', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TableRows />)
    }).not.toThrow()
  })
})
