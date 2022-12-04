import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { DELETE_GROUP_ROLE_MUTATION } from 'src/components/GroupRole/EditGroupRoleCell'

// const jsonDisplay = (obj) => {
//   return (
//     <pre>
//       <code>{JSON.stringify(obj, null, 2)}</code>
//     </pre>
//   )
// }
//
const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

// const checkboxInputTag = (checked) => {
//   return <input type="checkbox" checked={checked} disabled />
// }

const GroupRole = ({ groupRole }) => {
  const [deleteGroupRole] = useMutation(DELETE_GROUP_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('GroupRole deleted')
      navigate(routes.groupRoles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete groupRole ' + id + '?')) {
      deleteGroupRole({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            GroupRole {groupRole.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{groupRole.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(groupRole.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(groupRole.updatedAt)}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{groupRole.role}</td>
            </tr>
            <tr>
              <th>Group id</th>
              <td>{groupRole.groupId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editGroupRole({ id: groupRole.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(groupRole.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default GroupRole
