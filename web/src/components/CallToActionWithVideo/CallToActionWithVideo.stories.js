import { useState } from 'react'

import CallToActionWithVideo from './CallToActionWithVideo'

export const Generated = () => {
  let header = { lineOne: 'Accessible', lineTwo: 'Automation' }
  let message = `Have an idea for a new project? Does getting the access,
  business logic, and automation drag on? Seedling is a tool that makes it
  easy to get started with your project. It's free, and it's open source.`
  //let imageToVideo = './desk-g04ccd6cc7_1280.jpg'
  let imageToVideo = './desk-g04ccd6cc7_1280.webp'
  let imageAltText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
  let [displayVideo, setDisplayVideo] = useState(false)

  return (
    <CallToActionWithVideo
      header={header}
      message={message}
      imageAltText={imageAltText}
      image={imageToVideo}
      displayVideo={displayVideo}
      setDisplayVideo={setDisplayVideo}
    />
  )
}

export default { title: 'Components/CallToActionWithVideo' }
