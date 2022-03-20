import { render } from '@redwoodjs/testing/web'

import EditButton from './EditButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditButton />)
    }).not.toThrow()
  })
})
