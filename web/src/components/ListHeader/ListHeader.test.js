import { render } from '@redwoodjs/testing/web'

import ListHeader from './ListHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListHeader />)
    }).not.toThrow()
  })
})
