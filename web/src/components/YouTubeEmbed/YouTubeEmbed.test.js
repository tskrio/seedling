import { render } from '@redwoodjs/testing/web'

import YouTubeEmbed from './YouTubeEmbed'

describe('YouTubeEmbed', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<YouTubeEmbed />)
    }).not.toThrow()
  })
})
