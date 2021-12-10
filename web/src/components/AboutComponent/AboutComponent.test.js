import { render } from '@redwoodjs/testing'

import AboutComponent from './AboutComponent'

describe('AboutComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AboutComponent />)
    }).not.toThrow()
  })
})
