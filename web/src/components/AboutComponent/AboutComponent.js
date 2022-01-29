import { Button } from '@chakra-ui/react'
import { PlayIcon } from 'src/components/CallToActionWithVideo/'
import CallToActionWithVideo from 'src/components/CallToActionWithVideo/'
import { navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { Fragment, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/all'
const AboutComponent = () => {
  let header = { lineOne: 'Accessible', lineTwo: 'Automation' }
  let message = `Have an idea for a new project? Does getting the access,
  business logic, and automation drag on? Tskr is a tool that makes it
  easy to get started with your project. It's free, and it's open source.`
  let imageToVideo = './desk-g04ccd6cc7_1280.jpg'
  let imageAltText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
  const { isAuthenticated } = useAuth()
  let [displayVideo, setDisplayVideo] = useState(false)

  let unauthenticatedCTA = (
    <>
      <CallToActionWithVideo
        header={header}
        message={message}
        imageAltText={imageAltText}
        image={imageToVideo}
        displayVideo={displayVideo}
        setDisplayVideo={setDisplayVideo}
      >
        {!isAuthenticated && (
          <Fragment>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'green'}
              onClick={() => {
                navigate('/signup')
              }}
            >
              Signup
            </Button>

            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'green'}
              onClick={() => {
                navigate('/login')
              }}
            >
              Log in
            </Button>
          </Fragment>
        )}
        <Button
          rounded={'full'}
          size={'lg'}
          fontWeight={'normal'}
          px={6}
          colorScheme={'blue'}
          onClick={() => {
            setDisplayVideo(true)
          }}
          leftIcon={<PlayIcon h={4} w={4} color={'gray.400'} />}
        >
          How It Works
        </Button>
      </CallToActionWithVideo>
    </>
  )
  let buttonRef = useRef()
  let [buttonClicked, setButtonClicked] = useState(0)
  useEffect(() => {
    gsap.to(buttonRef.current, { rotation: '+=720', duration: 2 })
  }, [buttonClicked])
  let authenticatedMessage = (
    <Fragment>
      <Button
        ref={buttonRef}
        colorScheme="teal"
        variant="solid"
        onClick={() => {
          setButtonClicked(buttonClicked + 1)
        }}
      >
        Hello
      </Button>
    </Fragment>
  )
  return (
    (!isAuthenticated && unauthenticatedCTA) ||
    (isAuthenticated && authenticatedMessage)
  )
}

export default AboutComponent
