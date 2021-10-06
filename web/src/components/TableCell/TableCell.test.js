import { render } from '@redwoodjs/testing/web'

import TableCell from './TableCell'

describe('TableCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TableCell />)
    }).not.toThrow()
  })
})
