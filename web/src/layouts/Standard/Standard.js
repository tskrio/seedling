import { Link, navigate, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import AsideNavigator from 'src/components/AsideNavigator/AsideNavigator'
import Navbar from 'src/components/Navbar/Navbar'
import NavSidebar from 'src/components/NavSidebar/NavSidebar'

const Standard = ({ children }) => {
  const { logOut, isAuthenticated, currentUser } = useAuth()
  /*
<header data-grid-area="header">
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>
                <em>Home</em>
              </Link>
            </li>
            <li>
              <a href="https://github.com/tskrio/tskr">
                <em>Fork</em>
              </a>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to={routes.signup()}>
                  <em>Signup</em>
                </Link>
              </li>
            )}
            {isAuthenticated && currentUser && (
              <>
                <li>
                  <Link to={routes.editUser({ id: currentUser.id })}>
                    {currentUser.name}
                  </Link>
                </li>
                <li>
                  <a
                    onClick={async () => {
                      await logOut()
                      navigate('/')
                    }}
                  >
                    <span alt={JSON.stringify(currentUser)}>Log Out</span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      */
  return (
    <>
      <Navbar />
      {isAuthenticated && currentUser && <NavSidebar>{children}</NavSidebar>}
      {!isAuthenticated && <>{children}</>}
    </>
  )
}

export default Standard

/**
 <footer>
        <ul>
          <li>
            Made with{' '}
            <span role="img" aria-label="rockets">
              🚀
            </span>{' '}
            and{' '}
            <span role="img" aria-label="trees">
              🌴
            </span>
          </li>
        </ul>
      </footer>
 */
