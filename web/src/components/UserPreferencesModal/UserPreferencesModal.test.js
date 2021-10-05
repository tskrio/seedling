import { render } from '@redwoodjs/testing/web'

import UserPreferencesModal from './UserPreferencesModal'

describe('UserPreferencesModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserPreferencesModal />)
    }).not.toThrow()
  })
})
