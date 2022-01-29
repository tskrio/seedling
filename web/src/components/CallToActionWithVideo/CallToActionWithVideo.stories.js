import CallToActionWithVideo from './CallToActionWithVideo'

export const generated = () => {
  let header = { lineOne: 'Accessible', lineTwo: 'Automation' }
  let message = `Have an idea for a new project? Does getting the access,
  business logic, and automation drag on? Tskr is a tool that makes it
  easy to get started with your project. It's free, and it's open source.`
  let imageToVideo = './desk-g04ccd6cc7_1280.jpg'
  let imageAltText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'

  return (
    <CallToActionWithVideo
      header={header}
      message={message}
      imageAltText={imageAltText}
      image={imageToVideo}
    />
  )
}

export default { title: 'Components/CallToActionWithVideo' }
