import { render } from '@redwoodjs/testing/web'

import ListRowHeader from './ListRowHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListRowHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListRowHeader />)
    }).not.toThrow()
  })
})
