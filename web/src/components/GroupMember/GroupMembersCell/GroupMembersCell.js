import { Link, routes } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'

const DELETE_GROUP_MEMBER_MUTATION = gql`
  mutation DeleteGroupMemberMutation($id: Int!) {
    deleteGroupMember(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query FindGroupMembers {
    groupMembers {
      id
      createdAt
      updatedAt
      userId
      user {
        name
      }
      groupId
      group {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {`No Group Members yet.`}
      <Link to={routes.newGroupMember()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupMembers }) => {
  let title = 'Group Members'
  let columns = [
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
  ]
  let data = groupMembers
  let queries = {
    QUERY: QUERY,
    DELETEMUTATION: DELETE_GROUP_MEMBER_MUTATION,
  }
  let recordRoutes = {
    editRecord: (prop) => {
      return routes.editGroupMember(prop)
    },
    createRecord: () => {
      return routes.newGroupMember()
    },
  }
  let display = 'id'
  let roles = {
    createRecord: ['groupMemberCreate'],
    updateRecord: ['groupMemberUpdate'],
    readRecord: ['groupMemberRead'],
    deleteRecord: ['groupMemberDelete'],
  }
  let queryVariables = {}
  return (
    <TableComponent
      title={title}
      columns={columns}
      data={data}
      queries={queries}
      routes={recordRoutes}
      display={display}
      roles={roles}
      queryVariables={queryVariables}
    />
  )
}
