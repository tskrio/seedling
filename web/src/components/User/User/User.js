import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const User = ({ user }) => {
  const { hasRole } = useAuth()
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(user.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(user.updatedAt)}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        {hasRole(['userUpdate', 'admin']) && (
          <Link
            to={routes.editUser({ id: user.id })}
            className="rw-button rw-button-blue"
          >
            Edit
          </Link>
        )}
        {hasRole(['userDelete', 'admin']) && (
          <button
            type="button"
            className="rw-button rw-button-red"
            onClick={() => onDeleteClick(user.id)}
          >
            Delete
          </button>
        )}
      </nav>
    </>
  )
}

export default User
