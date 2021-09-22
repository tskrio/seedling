import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'

const UserRolesLayout = ({ children }) => {
  const { hasRole } = useAuth()
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.userRoles()} className="rw-link">
            UserRoles
          </Link>
        </h1>
        {hasRole(['groupRoleCreate', 'admin']) && (
          <Link to={routes.newUserRole()} className="rw-button rw-button-green">
            <div className="rw-button-icon">+</div> New UserRole
          </Link>
        )}
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default UserRolesLayout
