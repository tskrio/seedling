import { NavLink, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const AsideNavigator = () => {
  const { isAuthenticated, hasRole } = useAuth()
  let altText =
    'Find me in ./web/src/components/AsideNavigator/AsideNavigator.js'
  //console.log(altText.split('/')[altText.split.length-1], 'isAuthenticated', isAuthenticated)
  //console.log(altText.split('/')[altText.split.length-1], 'getCurrentUser', getCurrentUser)
  return (
    <>
      {isAuthenticated && (
        <aside alt={altText} className="aside">
          <ul className="navLinks">
            {hasRole(['userRead', 'admin']) && (
              <li>
                <NavLink to={routes.users()} activeClassName="active-page">
                  Users
                </NavLink>
              </li>
            )}
            {hasRole(['groupRead', 'admin']) && (
              <li>
                <NavLink to={routes.groups()} activeClassName="active-page">
                  Groups
                </NavLink>
              </li>
            )}
          </ul>
        </aside>
      )}
    </>
  )
}

export default AsideNavigator
