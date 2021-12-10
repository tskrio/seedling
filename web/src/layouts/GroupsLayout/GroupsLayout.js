import { Toaster } from '@redwoodjs/web/toast'

const GroupsLayout = ({ children }) => {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  )
}

export default GroupsLayout
