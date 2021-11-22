import { render } from '@redwoodjs/testing/web'

import FormComponent from './FormComponent'

describe('FormComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormComponent />)
    }).not.toThrow()
  })
})
