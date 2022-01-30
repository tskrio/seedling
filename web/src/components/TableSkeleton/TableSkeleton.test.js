import { render } from '@redwoodjs/testing/web'

import TableSkeleton from './TableSkeleton'

describe('TableSkeleton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TableSkeleton />)
    }).not.toThrow()
  })
})
