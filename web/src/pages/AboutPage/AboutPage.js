//import { useAuth } from '@redwoodjs/auth'

import AboutComponent from 'src/components/AboutComponent'
const AboutPage = () => {
  //const { currentUser, isAuthenticated } = useAuth()
  let auth0 = {
    domain: process.env.AUTH0_DOMAIN || false,
    redirect: process.env.AUTH0_REDIRECT_URI || false,
  }
  return <AboutComponent auth0={auth0} />
}

export default AboutPage
