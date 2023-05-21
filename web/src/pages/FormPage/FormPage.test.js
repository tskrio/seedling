import { render } from '@redwoodjs/testing/web'

import FormPage from './FormPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FormPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormPage />)
    }).not.toThrow()
  })
})
