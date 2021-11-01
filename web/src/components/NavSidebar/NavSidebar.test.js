import { render } from '@redwoodjs/testing/web'

import NavSidebar from './NavSidebar'

describe('NavSidebar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavSidebar />)
    }).not.toThrow()
  })
})
