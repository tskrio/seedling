import { render } from '@redwoodjs/testing/web'

import Pagination from './Pagination'

describe('Pagination', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Pagination />)
    }).not.toThrow()
  })
})
