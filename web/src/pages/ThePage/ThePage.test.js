import { render } from '@redwoodjs/testing/web'

import ThePage from './ThePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ThePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThePage />)
    }).not.toThrow()
  })
})
