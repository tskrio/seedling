import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/GroupRole/GroupRolesCell'

const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($id: Int!) {
    deleteGroupRole(id: $id) {
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

const GroupRolesList = ({ groupRoles }) => {
  const [deleteGroupRole] = useMutation(DELETE_GROUP_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('GroupRole deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete groupRole ' + id + '?')) {
      deleteGroupRole({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Role</th>
            <th>Group id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {groupRoles.map((groupRole) => (
            <tr key={groupRole.id}>
              <td>{truncate(groupRole.id)}</td>
              <td>{timeTag(groupRole.createdAt)}</td>
              <td>{timeTag(groupRole.updatedAt)}</td>
              <td>{truncate(groupRole.role)}</td>
              <td>{truncate(groupRole.groupId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.groupRole({ id: groupRole.id })}
                    title={'Show groupRole ' + groupRole.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editGroupRole({ id: groupRole.id })}
                    title={'Edit groupRole ' + groupRole.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete groupRole ' + groupRole.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(groupRole.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GroupRolesList
