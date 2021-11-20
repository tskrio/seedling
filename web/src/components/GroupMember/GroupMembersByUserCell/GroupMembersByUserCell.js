import { useTable } from 'react-table'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import GroupMembersLayout from 'src/layouts/GroupMembersLayout'
export const beforeQuery = (props) => {
  //console.log('variables', props)
  props.id = props.userID.id
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }
}

const DELETE_GROUP_MEMBER_MUTATION = gql`
  mutation DeleteGroupMemberMutation($id: Int!) {
    deleteGroupMember(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query getGroupMembersFromUser($id: Int!) {
    groupMembers: groupMembersByUser(id: $id) {
      id
      createdAt
      updatedAt
      userId
      groupId
      user {
        name
        id
      }
      group {
        name
        id
        createdAt
        updatedAt
        description
      }
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <GroupMembersLayout />
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupMembers }) => {
  const { currentUser, hasRole } = useAuth()
  const [deleteRecord] = useMutation(DELETE_GROUP_MEMBER_MUTATION, {
    onError: (error) => {
      console.log('onError', error, error.message)
      toast.error(error.message || `group member not deleted - error occured`)
    },
    onCompleted: (something) => {
      toast.success(`${JSON.stringify(something)} deleted`)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [
      {
        query: QUERY,
        variables: {
          id: groupMembers[0].group.id,
          /*not sure how to get the query variables */
        },
      },
    ],
    awaitRefetchQueries: true,
  })
  const onDeleteClick = (id, display) => {
    if (confirm(`Are you sure you want to delete ${display}?`)) {
      deleteRecord({ variables: { id } })
      console.log('groupMembers.length', groupMembers.length)
      let newGroupMembers = groupMembers.filter((groupMember) => {
        console.log(id === groupMember.id, id, groupMember)
        if (groupMember.id === id) {
          return false
        } else {
          return true
        }
      })
      //data = React.useMemo(() => groupMembers, []) // doesnt work
      console.log(`deleted id: ${id}`, newGroupMembers)
    }
  }
  console.log('groupMembers', groupMembers)
  groupMembers = groupMembers.map((groupMember) => {
    return {
      ...groupMember,
      actions: (
        <>
          {hasRole(['groupMemberUpdate', 'admin']) && (
            <span>
              <Link
                className="rw-button rw-button-blue"
                to={routes.editGroupMember({ id: groupMember.id })}
                title={'Edit group membership'}
              >
                Edit {groupMember.group.name} group membership
              </Link>
            </span>
          )}
          {hasRole(['groupMemberDelete', 'admin']) && (
            <span>
              <button
                type="button"
                title={'Delete group membership'}
                className="rw-button rw-button-red"
                onClick={() =>
                  onDeleteClick(
                    groupMember.id,
                    `${groupMember.group.name} membership`
                  )
                }
              >
                Delete {groupMember.group.name} group membership
              </button>
            </span>
          )}
        </>
      ),
    }
  })
  if (hasRole(['groupMemberCreate', 'admin'])) {
    groupMembers.push({
      actions: (
        <Link
          className="rw-button rw-button-green"
          to={routes.newGroupMember({ userId: groupMembers[0].user.id })}
        >
          New Membership
        </Link>
      ),
    })
  }

  const data = React.useMemo(() => groupMembers, [])
  const columns = React.useMemo(
    () => [
      {
        Header: 'Created At',
        accessor: 'createdAt', // accessor is the "key" in the data
      },
      {
        Header: 'Updated At',
        accessor: 'updatedAt',
      },
      {
        Header: 'User',
        accessor: 'user.name',
      },
      {
        Header: 'Group',
        accessor: 'group.name',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
      },
    ],
    []
  )
  const tableInstance = useTable({ columns, data })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance
  return (
    // apply the table props
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr key={headerGroup.key} {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th key={column.key} {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr key={row.key} {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td key={cell.key} {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
  // let meta = {
  //   title: 'Group Members',
  //   routes: {
  //     newItem: (prop) => {
  //       return routes.newGroupMember({ userId: groupMembers[0].user.id })
  //     },
  //     view: (prop) => {
  //       return routes.groupMember(prop)
  //     },
  //     edit: (prop) => {
  //       return routes.editGroupMember(prop)
  //     },
  //   },
  //   labels: {
  //     single: 'groupmember',
  //     multiple: 'groupmembers',
  //   },
  //   key: 'id',
  //   display: 'id',
  //   columns: [
  //     { key: 'user.name', label: 'User', type: 'reference' },
  //     { key: 'group.name', label: 'Group', type: 'reference' },
  //     { key: 'createdAt', label: 'Created', type: 'date' },
  //     { key: 'updatedAt', label: 'Updated', type: 'date' },
  //   ],
  //   createRoles: ['groupMemberCreate'],
  //   readRoles: ['groupMemberRead'],
  //   updateRoles: ['groupMemberUpdate'],
  //   deleteRoles: ['groupMemberDelete'],
  // }
  // return (
  //   <>
  //     <Table
  //       data={groupMembers}
  //       meta={meta}
  //       queryVariables={{ id: groupMembers[0].group.id }} // I don't know how to get the groupID from the query... so if there's a result, refresh the page
  //       query={QUERY}
  //       deleteMutation={DELETE_GROUP_MEMBER_MUTATION}
  //     />
  //   </>
  // )
}
