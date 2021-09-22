import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'

const GroupRolesLayout = ({ children, query }) => {
  const { hasRole } = useAuth()
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
        {hasRole(['groupRoleCreate', 'admin']) && (
          <Link
            to={routes.newGroupRole()}
            className="rw-button rw-button-green"
          >
            <div className="rw-button-icon">+</div> New GroupRole
          </Link>
        )}
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default GroupRolesLayout
