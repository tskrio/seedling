import { render } from '@redwoodjs/testing/web'

import TableQuery from './TableQuery'

describe('TableQuery', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TableQuery />)
    }).not.toThrow()
  })
})
