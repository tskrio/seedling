import { render } from '@redwoodjs/testing/web'

import TableHeaderColumn from './TableHeaderColumn'

describe('TableHeaderColumn', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TableHeaderColumn />)
    }).not.toThrow()
  })
})
