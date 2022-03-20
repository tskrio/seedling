import { render } from '@redwoodjs/testing/web'

import ShareButton from './ShareButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShareButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShareButton />)
    }).not.toThrow()
  })
})
