import AboutComponent from './AboutComponent'

//import './../../scaffold.css'
//import './../../reset.css'
//import './../../index.css'

export const auth0 = () => {
  let auth0Settings = {
    domain: 'somedomain.com',
    redirect: 'example.com',
  }
  return <AboutComponent auth0={auth0Settings} />
}

export const dbAuth = () => {
  return <AboutComponent />
}

export const authenticated = () => {
  let isAuthenticated = true
  let currentUser = { name: 'TestUser' }
  return (
    <AboutComponent
      isAuthenticated={isAuthenticated}
      currentUser={currentUser}
    />
  )
}

export default { title: 'Components/AboutComponent' }
