import { Auth0Client } from '@auth0/auth0-spa-js'
import {
  ChakraProvider,
  ColorModeScript /*, extendTheme*/,
} from '@chakra-ui/react'

import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { theme } from './chakraUiTheme'

//import 'src/scaffold.css'
//import 'src/reset.css'
//import 'src/index.css'

const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN, // https://auth0.com/docs/quickstart/spa/react#get-your-application-keys
  client_id: process.env.AUTH0_CLIENT_ID, // https://auth0.com/docs/quickstart/spa/react#get-your-application-keys
  redirect_uri: process.env.AUTH0_REDIRECT_URI, // the place you want to redirect to, for local development http://localhost:8910
  cacheLocation: 'localstorage',
  audience: process.env.AUTH0_AUDIENCE, // https://auth0.com/docs/quickstart/spa/react/02-calling-an-api#create-an-api aka identifier
})
const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <RedwoodProvider titleTemplate="%AppTitle · %PageTitle">
          {auth0.options.domain && (
            <AuthProvider type="auth0" client={auth0}>
              <RedwoodApolloProvider>
                <Routes />
              </RedwoodApolloProvider>
            </AuthProvider>
          )}
          {!auth0.options.domain && (
            <AuthProvider type="dbAuth">
              <RedwoodApolloProvider>
                <Routes />
              </RedwoodApolloProvider>
            </AuthProvider>
          )}
        </RedwoodProvider>
      </ChakraProvider>
    </FatalErrorBoundary>
  )
}

export default App
