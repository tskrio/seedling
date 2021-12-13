import { render } from '@redwoodjs/testing/web'

import TablePagination from './TablePagination'

describe('TablePagination', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TablePagination />)
    }).not.toThrow()
  })
})
