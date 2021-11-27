import { render } from '@redwoodjs/testing/web'

import PreferencesLayout from './PreferencesLayout'

describe('PreferencesLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PreferencesLayout />)
    }).not.toThrow()
  })
})
