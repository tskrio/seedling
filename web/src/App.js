import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import 'src/scaffold.css'
import 'src/reset.css'
import 'src/index.css'

window['__APOLLO_DEVTOOLS_GLOBAL_HOOK__'] = true // remove apollo dev tools message
// https://smart-swatch.netlify.app
const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      900: '#1a202c',
    },
    grey: {
      50: '#f1f2f4',
      100: '#d6d7d9',
      200: '#babcc0',
      300: '#9fa2a8',
      400: '#828791',
      500: '#696e78',
      600: '#52555d',
      700: '#3a3d42',
      800: '#232527',
      900: '#0b0c0e',
    },
    gray: {
      50: '#f1f2f4',
      100: '#d6d7d9',
      200: '#babcc0',
      300: '#9fa2a8',
      400: '#828791',
      500: '#696e78',
      600: '#52555d',
      700: '#3a3d42',
      800: '#232527',
      900: '#0b0c0e',
    },
    white: {
      50: '#f2f2f2',
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d',
    },
    blue: {
      50: '#e4e4ff',
      100: '#b2b3ff',
      200: '#7f80ff',
      300: '#4c4dff',
      400: '#1a1aff',
      500: '#0000e6',
      600: '#0000b4',
      700: '#000082',
      800: '#000050',
      900: '#000021',
    },
  },
})

const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%AppTitle · %PageTitle">
        <AuthProvider type="dbAuth">
          <ColorModeScript />
          <ChakraProvider theme={theme}>
            <RedwoodApolloProvider>
              <Routes />
            </RedwoodApolloProvider>
          </ChakraProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
