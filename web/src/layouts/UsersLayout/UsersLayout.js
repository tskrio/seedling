import { Toaster } from '@redwoodjs/web/toast'
const UsersLayout = ({ children }) => {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  )
}

export default UsersLayout
