import { render } from '@redwoodjs/testing/web'

import NavItem from './NavItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavItem />)
    }).not.toThrow()
  })
})
