import { render } from '@redwoodjs/testing'

import AsideNavigator from './AsideNavigator'

describe('AsideNavigator', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AsideNavigator />)
    }).not.toThrow()
  })
})
