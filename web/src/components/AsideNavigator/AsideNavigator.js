import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const AsideNavigator = () => {
  const { isAuthenticated } = useAuth()
  let altText =
    'Find me in ./web/src/components/AsideNavigator/AsideNavigator.js'
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
              <Link to={routes.tasks()}>Tasks</Link>
            </li>
          </ul>
        </aside>
      )}
    </>
  )
}

export default AsideNavigator
