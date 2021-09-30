import { render } from '@redwoodjs/testing/web'

import SideBarToggle from './SideBarToggle'

describe('SideBarToggle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SideBarToggle />)
    }).not.toThrow()
  })
})
