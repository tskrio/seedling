import { render } from '@redwoodjs/testing/web'

import IconPicker from './IconPicker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IconPicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IconPicker />)
    }).not.toThrow()
  })
})
