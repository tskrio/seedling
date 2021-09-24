import { NavLink, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const AsideNavigator = () => {
  const { isAuthenticated, hasRole } = useAuth()
  let altText =
    'Find me in ./web/src/components/AsideNavigator/AsideNavigator.js'
  //console.log(altText.split('/')[altText.split.length-1], 'isAuthenticated', isAuthenticated)
  //console.log(altText.split('/')[altText.split.length-1], 'getCurrentUser', getCurrentUser)
  let toggleSidebar = () => {
    //console.log('toggleSidebar')
    document.querySelector('#redwood-app').classList.toggle('off-canvas')
  }
  return (
    <>
      <aside alt={altText} className="aside">
        <div className="left">
          {isAuthenticated && (
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
          )}
        </div>
        <div className="right">
          <span onClick={toggleSidebar}>◀</span>
        </div>
      </aside>
    </>
  )
}

export default AsideNavigator
