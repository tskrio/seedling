import { render } from '@redwoodjs/testing/web'

import CallToActionWithVideo from './CallToActionWithVideo'

describe('CallToActionWithVideo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CallToActionWithVideo />)
    }).not.toThrow()
  })
})
