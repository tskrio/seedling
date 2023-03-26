import { render } from '@redwoodjs/testing/web'

import Login2Page from './Login2Page'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('Login2Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Login2Page />)
    }).not.toThrow()
  })
})
