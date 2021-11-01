import { useAuth } from '@redwoodjs/auth'
import Navbar from 'src/components/Navbar/Navbar'
import NavSidebar from 'src/components/NavSidebar/NavSidebar'

const Standard = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <Navbar />
      {isAuthenticated && currentUser && <NavSidebar>{children}</NavSidebar>}
      {!isAuthenticated && <>{children}</>}
    </>
  )
}

export default Standard
