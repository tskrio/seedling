import { render } from '@redwoodjs/testing/web'

import TableColumns from './TableColumns'

describe('TableColumns', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TableColumns />)
    }).not.toThrow()
  })
})
