import { render } from '@redwoodjs/testing/web'

import Lookup from './Lookup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Lookup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Lookup />)
    }).not.toThrow()
  })
})
