import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { QUERY } from 'src/components/User/UsersCell'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const UsersList = ({ users }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }
  const { isAuthenticated, hasRole } = useAuth()
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Email</th>
            <th>Name</th>
            <th>Hashed password</th>
            <th>Salt</th>
            <th>Preferences</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{truncate(user.id)}</td>
              <td>{timeTag(user.createdAt)}</td>
              <td>{timeTag(user.updatedAt)}</td>
              <td>{truncate(user.email)}</td>
              <td>{truncate(user.name)}</td>
              <td>{truncate(user.hashedPassword)}</td>
              <td>{truncate(user.salt)}</td>
              <td>{truncate(user.preferences)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.user({ id: user.id })}
                    title={'Show user ' + user.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>

                  {hasRole(['userUpdate', 'admin']) && (
                    <Link
                      to={routes.editUser({ id: user.id })}
                      title={'Edit user ' + user.id}
                      className="rw-button rw-button-small rw-button-blue"
                    >
                      Edit
                    </Link>
                  )}
                  {hasRole(['userDelete', 'admin']) && (
                    <button
                      type="button"
                      title={'Delete user ' + user.id}
                      className="rw-button rw-button-small rw-button-red"
                      onClick={() => onDeleteClick(user.id)}
                    >
                      Delete
                    </button>
                  )}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
