import { render } from '@redwoodjs/testing/web'

import PageComponent from './PageComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PageComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PageComponent />)
    }).not.toThrow()
  })
})
