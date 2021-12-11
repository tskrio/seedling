import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import 'src/scaffold.css'
import 'src/reset.css'
import 'src/index.css'
window['__APOLLO_DEVTOOLS_GLOBAL_HOOK__'] = true // remove apollo dev tools message
const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%AppTitle · %PageTitle">
        <AuthProvider type="dbAuth">
          <ColorModeScript />
          <ChakraProvider>
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
