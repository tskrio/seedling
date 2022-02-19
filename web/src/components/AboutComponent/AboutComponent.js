import { Box, Button } from '@chakra-ui/react'
import { PlayIcon } from 'src/components/CallToActionWithVideo/'
import CallToActionWithVideo from 'src/components/CallToActionWithVideo/'
import { navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { Fragment /*, useEffect, useRef*/, useState } from 'react'
//import { gsap } from 'gsap/all'
const AboutComponent = () => {
  let header = { lineOne: 'Accessible', lineTwo: 'Automation' }
  let message = `Have an idea for a new project? Does getting the access,
  business logic, and automation drag on? Tskr is a tool that makes it
  easy to get started with your project. It's free, and it's open source.`
  let imageToVideo = './desk-g04ccd6cc7_1280.webp'
  let imageAltText =
    'Find me in ./web/src/components/AboutComponent/AboutComponent.js'
  const { loading, isAuthenticated, logIn, logOut /*, currentUser*/, type } =
    useAuth()
  let [displayVideo, setDisplayVideo] = useState(false)

  if (loading) {
    // auth is rehydrating
    return null
  }
  let loginButtonString = 'Login'
  if (process.env.AUTH0_DOMAIN) {
    loginButtonString = 'Login/Signup'
  }
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
            {!process.env.AUTH0_DOMAIN && (
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
            )}
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'green'}
              onClick={async () => {
                if (type === 'auth0') {
                  if (isAuthenticated) {
                    await logOut({ returnTo: process.env.AUTH0_REDIRECT_URI })
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
              {isAuthenticated ? 'Log out' : loginButtonString}
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
  /*let buttonRef = useRef()
  let [buttonClicked, setButtonClicked] = useState(0)
  useEffect(() => {
    //gsap.to(buttonRef.current, { rotation: '+=720', duration: 2 })
  }, [buttonClicked])
  */
  let authenticatedMessage = (
    <Fragment>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => {
          //setButtonClicked(buttonClicked + 1)
          console.log('clicked')
        }}
      >
        Hello
      </Button>
      <Box backgroundColor={'#7ed957'} maxWidth={'200px'} maxHeight={'200px'}>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          //width="553.000000pt"
          //height="544.000000pt"
          viewBox="0 0 553.000000 544.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,544.000000) scale(0.100000,-0.100000)"
            fill="#00275b"
            stroke="none"
          >
            <path
              d="M0 2720 l0 -2720 2765 0 2765 0 0 2720 0 2720 -2765 0 -2765 0 0
-2720z m2870 2277 c20 -10 278 -260 600 -582 l565 -565 -602 -602 -603 -603
-298 298 -297 297 -145 -145 -145 -145 440 -440 440 -440 747 747 748 748 376
-375 c248 -247 382 -389 395 -415 24 -52 24 -138 0 -190 -13 -28 -356 -377
-1112 -1131 -1027 -1025 -1097 -1092 -1141 -1104 -56 -15 -114 -8 -166 20 -56
29 -2198 2176 -2217 2222 -19 48 -19 128 0 176 11 26 333 355 1098 1121 860
860 1092 1088 1132 1107 58 29 127 29 185 1z"
            />
          </g>
        </svg>
      </Box>
    </Fragment>
  )
  return (
    (!isAuthenticated && unauthenticatedCTA) ||
    (isAuthenticated && authenticatedMessage)
  )
}

export default AboutComponent
