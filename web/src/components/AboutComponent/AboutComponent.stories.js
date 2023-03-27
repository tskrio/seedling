import AboutComponent from './AboutComponent'

//import './../../scaffold.css'
//import './../../reset.css'
//import './../../index.css'

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
