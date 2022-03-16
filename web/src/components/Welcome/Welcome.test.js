import { render } from '@redwoodjs/testing/web'

import Welcome from './Welcome'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Welcome', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Welcome />)
    }).not.toThrow()
  })
})
