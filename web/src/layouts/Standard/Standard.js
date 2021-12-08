import Navbar from 'src/components/Navbar/Navbar'
import NavSidebar from 'src/components/NavSidebar/NavSidebar'
import AboutPage from 'src/pages/AboutPage'
import CookieModal from 'src/components/CookieModal'
import { useAuth } from '@redwoodjs/auth'
const Standard = ({ children }) => {
  const { isAuthenticated, currentUser, hasRole } = useAuth()
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} currentUser={currentUser} />
      {isAuthenticated && currentUser && (
        <NavSidebar
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          hasRole={hasRole}
        >
          {children}
        </NavSidebar>
      )}
      {!isAuthenticated && <AboutPage />}
      <CookieModal />
      {/*{!isAuthenticated && <>{children}</>}*/}
      {/*<NavSidebar>{children}</NavSidebar>*/}
    </>
  )
}

export default Standard
