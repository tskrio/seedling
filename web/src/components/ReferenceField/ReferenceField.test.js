import { render } from '@redwoodjs/testing/web'

import ReferenceField from './ReferenceField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReferenceField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReferenceField />)
    }).not.toThrow()
  })
})
