import { render } from '@redwoodjs/testing/web'

import DeployButton from './DeployButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DeployButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeployButton />)
    }).not.toThrow()
  })
})
