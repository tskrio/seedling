import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const GroupRolesLayout = ({ children, query }) => {
  console.log('in group roles layout')
  console.log('in group roles layout w/props', query)
  console.log('in group roles layout w/children', children)

  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.groupRoles()} className="rw-link">
            GroupRoles
          </Link>
        </h1>
        <p>{query}</p>
        <Link to={routes.newGroupRole()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New GroupRole
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default GroupRolesLayout
