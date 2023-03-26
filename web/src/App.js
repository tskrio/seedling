
import {
  ChakraProvider,
  ColorModeScript /*, extendTheme*/,
} from '@chakra-ui/react'

import { AuthProvider, useAuth } from 'src/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { theme } from './chakraUiTheme'

const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <RedwoodProvider titleTemplate="%AppTitle · %PageTitle">
          <AuthProvider>
              <RedwoodApolloProvider useAuth={useAuth}>
                <Routes />
              </RedwoodApolloProvider>
            </AuthProvider>
        </RedwoodProvider>
      </ChakraProvider>
    </FatalErrorBoundary>
  )
}

export default App
