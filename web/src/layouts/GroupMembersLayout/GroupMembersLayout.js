import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
const GroupMembersLayout = ({ children, query }) => {
  const { hasRole } = useAuth()
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.groupMembers()} className="rw-link">
            GroupMembers
          </Link>
        </h1>
        <p>{query}</p>
        {hasRole(['groupMemberCreate', 'admin']) && (
          <Link
            to={routes.newGroupMember()}
            className="rw-button rw-button-green"
          >
            <div className="rw-button-icon">+</div> New GroupMember
          </Link>
        )}
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default GroupMembersLayout
