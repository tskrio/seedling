const VimeoEmbed = ({ embedId }) => {
  if (!embedId) {
    return '671340404'
  }
  //       {/* src="https://player.vimeo.com/video/671340404?h=9b6affbdc8" */}
  return (
    <iframe
      title="Vimeo Video"
      src="https://player.vimeo.com/video/671340404?h=9b6affbdc8"
      width="640"
      height="360"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}

export default VimeoEmbed
