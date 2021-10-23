import { render } from '@redwoodjs/testing/web'

import LanguagePicker from './LanguagePicker'

describe('LanguagePicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LanguagePicker />)
    }).not.toThrow()
  })
})
