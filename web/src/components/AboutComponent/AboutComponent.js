import { Fragment, useState } from 'react'

import { Box, Button } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { navigate } from '@redwoodjs/router'

import { PlayIcon } from 'src/components/CallToActionWithVideo/'
import CallToActionWithVideo from 'src/components/CallToActionWithVideo/'
import DeployButton from 'src/components/DeployButton'
import Welcome from 'src/components/Welcome'
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
          {!auth0?.domain && (
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
              Signup
            </Button>
          )}
          <Button
            rounded={'full'}
            size={'lg'}
            fontWeight={'normal'}
            px={6}
            backgroundColor={'green'}
            color={'white'}
            onClick={async () => {
              if (type === 'auth0') {
                if (isAuthenticated) {
                  await logOut({ returnTo: auth0.redirect })
                } else {
                  const searchParams = new URLSearchParams(
                    window.location.search
                  )
                  await logIn({
                    appState: { targetUrl: searchParams.get('redirectTo') },
                  })
                }
              }
              if (type === 'dbAuth') {
                navigate('/login')
              }
            }}
          >
            {loginButtonString}
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
