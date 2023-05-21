import { render } from '@redwoodjs/testing/web'

import ListRowFooter from './ListRowFooter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListRowFooter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListRowFooter />)
    }).not.toThrow()
  })
})
