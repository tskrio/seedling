import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'


const LogoutPage = () => {
  const { logOut, isAuthenticated, currentUser } = useAuth()
    if (isAuthenticated) {
      logOut()
      navigate('/')
    }
    return (
      <>
        <MetaTags
          title="Logout"
          // description="Logout description"
          /* you should un-comment description and add a unique description, 155 characters or less
        You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
        />

        <h1>Logging out</h1>
      </>
    )
}

export default LogoutPage
