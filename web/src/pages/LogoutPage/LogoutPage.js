import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

const LogoutPage = () => {
  const { logOut, isAuthenticated } = useAuth()
  if (isAuthenticated) {
    logOut()
  }
  return (
    <>
      <MetaTags title="Logout" />
      <h1>Logging out</h1>
    </>
  )
}

export default LogoutPage
