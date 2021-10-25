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
    document.querySelector('#aside-left').classList.toggle('left')
    document.querySelector('#aside-right').classList.toggle('left')
    document.querySelector('#aside-right').classList.toggle('right')
  }
  return (
    <>
      <aside data-grid-area="aside" src={altText} className="aside">
        <div id="aside-left" className="left">
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
        <div id="aside-right" className="right full-height">
          <span onClick={toggleSidebar}>&harr;</span>
        </div>
      </aside>
    </>
  )
}

export default AsideNavigator
