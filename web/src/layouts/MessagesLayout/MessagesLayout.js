import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const MessagesLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.messages()} className="rw-link">
            Messages
          </Link>
        </h1>
        <Link to={routes.newMessage()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Message
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default MessagesLayout
