const YouTubeEmbed = ({ embedId, width, height, title }) => (
  //src={`https://www.youtube.com/embed/${embedId}?rel=0&iv_load_policy=3&color=white&autohide=0`}
  <div className="video-responsive">
    <iframe
      title={title || 'YouTube Video'}
      width={width || '640'}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
      height={height || '360'}
      src={`https://www.youtube.com/embed/${embedId}?rel=0&&color=white&autohide=0`}
    ></iframe>
  </div>
)

export default YouTubeEmbed
