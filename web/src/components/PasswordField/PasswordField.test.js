import { render } from '@redwoodjs/testing/web'

import PasswordField from './PasswordField'

describe('PasswordField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PasswordField />)
    }).not.toThrow()
  })
})
