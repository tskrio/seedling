import { Fragment, useState } from 'react'

import { Box, Button, Link } from '@chakra-ui/react'

import { navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { PlayIcon } from 'src/components/CallToActionWithVideo/'
import CallToActionWithVideo from 'src/components/CallToActionWithVideo/'
import Welcome from 'src/components/Welcome'
import DeployButton from 'src/components/DeployButton'

//import InstallExtension from '../InstallExtension/InstallExtension'
const AboutComponent = ({ auth0 /*, isAuthenticated, currentUser*/ }) => {
  const { isAuthenticated } = useAuth()

  let header = { lineOne: 'Seedling', lineTwo: 'Starter' }
  let message = `Have an idea for a new project? Does getting the access,
  business logic, and automation drag on? Seedling is a tool that makes it
  easy to get started with your project. It's free, and it's open source.`
  let imageToVideo = './desk-g04ccd6cc7_1280.webp'
  let imageAltText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
  const { loading, logIn, logOut /*, currentUser*/, type } = useAuth()
  let [displayVideo, setDisplayVideo] = useState(false)

  if (loading) {
    // auth is rehydrating
    return null
  }
  let loginButtonString = 'Login'
  if (auth0?.domain) {
    loginButtonString = 'Login/Signup'
  }
  let unauthenticatedCTA = (
    <Box p={3} bg={'white'}>
      <CallToActionWithVideo
        header={header}
        message={message}
        imageAltText={imageAltText}
        image={imageToVideo}
        displayVideo={displayVideo}
        setDisplayVideo={setDisplayVideo}
      >
        <Fragment>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              backgroundColor={'green'}
              color={'white'}
              onClick={() => {
                navigate('/signup')
              }}
            >
              Sign up!
            </Button>
        </Fragment>
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
        <DeployButton />
      </CallToActionWithVideo>
    </Box>
  )

  return (
    (!isAuthenticated && unauthenticatedCTA) || (isAuthenticated && <Welcome />)
  )
}

export default AboutComponent
