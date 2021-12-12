import { render } from '@redwoodjs/testing/web'

import Breadcrumbs from './Breadcrumbs'

describe('Breadcrumbs', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Breadcrumbs />)
    }).not.toThrow()
  })
})
