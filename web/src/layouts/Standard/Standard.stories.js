import Standard from './Standard'

export const generated = () => {
  return <Standard />
}

export const authenticated = () => {
  let isAuthenticated = true
  let currentUser = { name: 'TestUser' }
  return (
    <Standard isAuthenticated={isAuthenticated} currentUser={currentUser} />
  )
}

export default { title: 'Layouts/Standard' }
