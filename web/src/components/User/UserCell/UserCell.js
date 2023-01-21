import User from 'src/components/User/User'

export const QUERY = gql`
  query FindUserById($cuid: String!) {
    user: user(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ user }) => {
  return <User user={user} />
}
