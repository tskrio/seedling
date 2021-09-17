import { Link, routes } from '@redwoodjs/router'
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
        <aside alt={altText}>
          <ul>
            {hasRole(['userRead', 'admin']) && (
              <li>
                <Link to={routes.users()}>Users</Link>
              </li>
            )}
            {hasRole(['groupRead', 'admin']) && (
              <li>
                <Link to={routes.groups()}>Groups</Link>
              </li>
            )}
            {hasRole(['userRoleRead', 'admin']) && (
              <li>
                <Link to={routes.userRoles()}>User Roles</Link>
              </li>
            )}
          </ul>
        </aside>
      )}
    </>
  )
}

export default AsideNavigator
