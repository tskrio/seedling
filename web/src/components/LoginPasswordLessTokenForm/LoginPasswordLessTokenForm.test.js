import { render } from '@redwoodjs/testing/web'

import LoginPasswordLessTokenForm from './LoginPasswordLessTokenForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoginPasswordLessTokenForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPasswordLessTokenForm />)
    }).not.toThrow()
  })
})
