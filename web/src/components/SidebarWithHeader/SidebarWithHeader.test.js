import { render } from '@redwoodjs/testing/web'

import SidebarWithHeader from './SidebarWithHeader'

describe('SidebarWithHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SidebarWithHeader />)
    }).not.toThrow()
  })
})
