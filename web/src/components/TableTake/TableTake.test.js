import { render } from '@redwoodjs/testing/web'

import TableTake from './TableTake'

describe('TableTake', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TableTake />)
    }).not.toThrow()
  })
})
