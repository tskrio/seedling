import { render } from '@redwoodjs/testing/web'

import VimeoEmbed from './VimeoEmbed'

describe('VimeoEmbed', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VimeoEmbed />)
    }).not.toThrow()
  })
})
