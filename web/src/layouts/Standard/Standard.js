//import Navbar from 'src/components/Navbar/Navbar'
import NavSidebar from 'src/components/NavSidebar/NavSidebar'
import AboutPage from 'src/pages/AboutPage'
import CookieModal from 'src/components/CookieModal'
import { useAuth } from '@redwoodjs/auth'
import SidebarWithHeader from 'src/components/SidebarWithHeader'
import Footer from 'src/components/Footer'
import { Fragment } from 'react'
const Standard = ({ children }) => {
  const { isAuthenticated, currentUser, hasRole } = useAuth()
  const brand = 'Tskr'
  return (
    <>
      {/*<Navbar isAuthenticated={isAuthenticated} currentUser={currentUser} />*/}
      {isAuthenticated && currentUser && (
        <SidebarWithHeader brand={brand}>{children}</SidebarWithHeader>
      )}
      {/*<NavSidebar
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          hasRole={hasRole}
        >
          {children}
        </NavSidebar>*/}
      {!isAuthenticated && (
        <Fragment>
          <AboutPage />
          <Footer />
        </Fragment>
      )}
      <CookieModal />

      {/*{!isAuthenticated && <>{children}</>}*/}
      {/*<NavSidebar>{children}</NavSidebar>*/}
    </>
  )
}

export default Standard
