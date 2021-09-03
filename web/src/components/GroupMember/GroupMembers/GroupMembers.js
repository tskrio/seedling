import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/GroupMember/GroupMembersCell'

const DELETE_GROUP_MEMBER_MUTATION = gql`
  mutation DeleteGroupMemberMutation($id: Int!) {
    deleteGroupMember(id: $id) {
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

/*const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}*/

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

/*const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}*/

const GroupMembersList = ({ groupMembers }) => {
  const [deleteGroupMember] = useMutation(DELETE_GROUP_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('GroupMember deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete groupMember ' + id + '?')) {
      deleteGroupMember({ variables: { id } })
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
            <th>User</th>
            <th>Group</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {groupMembers.map((groupMember) => (
            <tr key={groupMember.id}>
              <td>{truncate(groupMember.id)}</td>
              <td>{timeTag(groupMember.createdAt)}</td>
              <td>{timeTag(groupMember.updatedAt)}</td>
              <td>{truncate(groupMember.user.name)}</td>
              <td>{truncate(groupMember.group.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.groupMember({ id: groupMember.id })}
                    title={'Show groupMember ' + groupMember.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editGroupMember({ id: groupMember.id })}
                    title={'Edit groupMember ' + groupMember.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete groupMember ' + groupMember.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(groupMember.id)}
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

export default GroupMembersList
