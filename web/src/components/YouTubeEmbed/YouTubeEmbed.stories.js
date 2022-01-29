import YouTubeEmbed from './YouTubeEmbed'

export const onlyEmbedId = () => {
  return <YouTubeEmbed embedId={'dQw4w9WgXcQ'} />
}

export const size360 = () => {
  return <YouTubeEmbed embedId={'dQw4w9WgXcQ'} width={640} height={360} />
}

export default { title: 'Components/YouTubeEmbed' }
