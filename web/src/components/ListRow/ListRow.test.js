import { render } from '@redwoodjs/testing/web'

import ListRow from './ListRow'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListRow', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListRow />)
    }).not.toThrow()
  })
})
