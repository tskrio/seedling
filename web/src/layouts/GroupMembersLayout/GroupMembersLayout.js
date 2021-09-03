import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const GroupMembersLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.groupMembers()} className="rw-link">
            GroupMembers
          </Link>
        </h1>
        <Link
          to={routes.newGroupMember()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New GroupMember
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default GroupMembersLayout
