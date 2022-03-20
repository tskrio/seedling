import { render } from '@redwoodjs/testing/web'

import DeleteButton from './DeleteButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DeleteButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteButton />)
    }).not.toThrow()
  })
})
