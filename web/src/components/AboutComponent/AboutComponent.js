import { Button } from '@chakra-ui/react'
import { PlayIcon } from 'src/components/CallToActionWithVideo/'
import CallToActionWithVideo from 'src/components/CallToActionWithVideo/'
import { navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { Fragment } from 'react'
const AboutComponent = () => {
  let header = { lineOne: 'Accessible', lineTwo: 'Automation' }
  let message = `Have an idea for a new project? Does getting the access,
  business logic, and automation drag on? Tskr is a tool that makes it
  easy to get started with your project. It's free, and it's open source.`
  let imageToVideo = './desk-g04ccd6cc7_1280.jpg'
  let imageAltText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
  const { isAuthenticated } = useAuth()
  return (
    <>
      <CallToActionWithVideo
        header={header}
        message={message}
        imageAltText={imageAltText}
        image={imageToVideo}
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
          leftIcon={<PlayIcon h={4} w={4} color={'gray.400'} />}
        >
          How It Works
        </Button>
      </CallToActionWithVideo>
    </>
  )
}

export default AboutComponent
