import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const AsideNavigator = () => {
const { isAuthenticated, currentUser, hasRole } = useAuth()
  let altText =
    'Find me in ./web/src/components/AsideNavigator/AsideNavigator.js'
  //console.log(altText.split('/')[altText.split.length-1], 'isAuthenticated', isAuthenticated)
  //console.log(altText.split('/')[altText.split.length-1], 'getCurrentUser', getCurrentUser)
  return (
    <>
      {isAuthenticated && (
        <aside alt={altText}>
          <ul>
            <li>
              <Link to={routes.users()}>Users</Link>
            </li>
            <li>
              <Link to={routes.groups()}>Groups</Link>
            </li>
            <li>
            <p>"{JSON.stringify(currentUser)}"</p>
            </li>
          </ul>
        </aside>
      )}
    </>
  )
}

export default AsideNavigator
