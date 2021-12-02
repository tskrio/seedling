import { render } from '@redwoodjs/testing/web'

import Table from './Table'

describe('Table', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Table />)
    }).not.toThrow()
  })
})
