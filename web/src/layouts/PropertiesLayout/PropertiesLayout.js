import { Fragment } from 'react'

import { Box } from '@chakra-ui/react'

import { Toaster } from '@redwoodjs/web/toast'
const PropertiesLayout = ({ children }) => {
  return (
    <Fragment>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Box p={4} background={'white'}>
        {children}
      </Box>
    </Fragment>
  )
}

export default PropertiesLayout
