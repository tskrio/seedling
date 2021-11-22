import Navbar from 'src/components/Navbar/Navbar'
import NavSidebar from 'src/components/NavSidebar/NavSidebar'

const Standard = ({ children }) => {
  return (
    <>
      <Navbar />
      {/*{isAuthenticated && currentUser && <NavSidebar>{children}</NavSidebar>}*/}
      {/*{!isAuthenticated && <>{children}</>}*/}
      <NavSidebar>{children}</NavSidebar>
    </>
  )
}

export default Standard
