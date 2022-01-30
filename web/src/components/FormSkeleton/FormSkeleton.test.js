import { render } from '@redwoodjs/testing/web'

import FormSkeleton from './FormSkeleton'

describe('FormSkeleton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormSkeleton />)
    }).not.toThrow()
  })
})
