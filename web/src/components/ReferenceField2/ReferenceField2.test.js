import { render } from '@redwoodjs/testing/web'

import ReferenceField2 from './ReferenceField2'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReferenceField2', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReferenceField2 />)
    }).not.toThrow()
  })
})
