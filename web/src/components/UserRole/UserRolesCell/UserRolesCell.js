import { Link, routes } from '@redwoodjs/router'

import UserRoles from 'src/components/UserRole/UserRoles'

export const QUERY = gql`
  query FindUserRoles {
    userRoles {
      id
      createdAt
      updatedAt
      userId
      user {
        name
      }
      role
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userRoles yet. '}
      <Link to={routes.newUserRole()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userRoles }) => {
  return <UserRoles userRoles={userRoles} />
}
