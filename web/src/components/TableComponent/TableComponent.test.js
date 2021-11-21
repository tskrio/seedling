import { render } from '@redwoodjs/testing/web'

import TableComponent from './TableComponent'

describe('TableComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TableComponent />)
    }).not.toThrow()
  })
})
