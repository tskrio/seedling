import React from 'react'
const ListContext = React.createContext()
export { ListContext }
import {
  ChakraProvider,
  ColorModeScript /*, extendTheme*/,
} from '@chakra-ui/react'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { AuthProvider, useAuth } from 'src/auth'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { theme } from './chakraUiTheme'


import './scaffold.css'
import './index.css'

const App = () => {
  const [table, setTable] = React.useState()
  const [page, setPage] = React.useState(0)
  const [take, setTake] = React.useState(10)
  const [where, setWhere] = React.useState()
  const [orderBy, setOrderBy] = React.useState()
  const [records, setRecords] = React.useState([])
  React.useEffect(() => {
    if (table) {
      let url = `/list/${table}/page/${page}/take/${take}`
      if (orderBy) url += `/orderBy/${orderBy}`
      if (where) url += `/where/${where}`

      window.history.pushState({}, '', url)
    }
  }, [table, page, take, where, orderBy, records])
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <ColorModeScript />
      <ListContext.Provider
        value={{
          table,
          setTable,
          page,
          setPage,
          take,
          setTake,
          where,
          setWhere,
          orderBy,
          setOrderBy,
          records,
          setRecords,
        }}
      >
      <ChakraProvider theme={theme}>
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
          <AuthProvider>
            <RedwoodApolloProvider useAuth={useAuth}>
              <Routes />
            </RedwoodApolloProvider>
          </AuthProvider>
        </RedwoodProvider>
      </ChakraProvider>
      </ListContext.Provider>
    </FatalErrorBoundary>
  )
}

export default App