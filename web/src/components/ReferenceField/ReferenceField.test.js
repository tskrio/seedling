import { render } from '@redwoodjs/testing/web'

import ReferenceField from './ReferenceField'

describe('ReferenceField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReferenceField />)
    }).not.toThrow()
  })
})
