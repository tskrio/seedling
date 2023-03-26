import { render } from '@redwoodjs/testing/web'

import LoginPasswordLessForm from './LoginPasswordLessForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoginPasswordLessForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPasswordLessForm />)
    }).not.toThrow()
  })
})
