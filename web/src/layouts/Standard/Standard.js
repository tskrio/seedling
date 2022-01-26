import AboutPage from 'src/pages/AboutPage'
import CookieModal from 'src/components/CookieModal'
import { useAuth } from '@redwoodjs/auth'
import SidebarWithHeader from 'src/components/SidebarWithHeader'
import Footer from 'src/components/Footer'
import { Fragment } from 'react'
const Standard = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const brand = 'Tskr'
  let myProps = {
    brand,
    isAuthenticated,
    currentUser,
  }
  return (
    <Fragment>
      {isAuthenticated && currentUser && (
        <SidebarWithHeader {...myProps}>{children}</SidebarWithHeader>
      )}
      {!isAuthenticated && (
        <Fragment>
          <AboutPage />
          <Footer />
        </Fragment>
      )}
      <CookieModal />
    </Fragment>
  )
}

export default Standard
