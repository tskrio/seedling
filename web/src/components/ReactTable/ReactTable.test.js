import { render } from '@redwoodjs/testing/web'

import ReactTable from './ReactTable'

describe('ReactTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReactTable />)
    }).not.toThrow()
  })
})
