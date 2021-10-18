import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'

const GroupsLayout = ({ children }) => {
  const { hasRole } = useAuth()
  return (
    <div>
      <Toaster />
      {children}
    </div>
  )
}

export default GroupsLayout
