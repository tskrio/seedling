import { render } from '@redwoodjs/testing/web'

import FormComponentOld from './FormComponentOld'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FormComponentOld', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormComponentOld />)
    }).not.toThrow()
  })
})
