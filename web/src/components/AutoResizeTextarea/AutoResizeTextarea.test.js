import { render } from '@redwoodjs/testing/web'

import AutoResizeTextarea from './AutoResizeTextarea'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AutoResizeTextarea', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AutoResizeTextarea />)
    }).not.toThrow()
  })
})
