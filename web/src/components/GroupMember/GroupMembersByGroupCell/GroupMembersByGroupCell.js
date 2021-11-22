import { useParams, Link, routes } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
export const beforeQuery = (props) => {
  //console.log('variables', props)
  props.id = props.groupID.id
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
  query getGroupMembersFromGroup($id: Int!) {
    groupMembers: groupMembersByGroup(id: $id) {
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
  const { id } = useParams()
  return (
    <div className="rw-text-center">
      {`No Group Members yet.`}
      <Link to={routes.newGroupMember({ groupId: id })} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)
export const Success = ({ groupMembers }) => {
  let title = 'Group Members By Group'
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
  let data = groupMembers.map((groupMember) => {
    return {
      ...groupMember,
      createdAt: new Date(
        groupMember.createdAt
      ).toLocaleString(/**TODO: User preference! */),
      updatedAt: new Date(
        groupMember.createdAt
      ).toLocaleString(/**TODO: User preference! */),
    }
  })

  let queries = {
    QUERY: QUERY,
    DELETEMUTATION: DELETE_GROUP_MEMBER_MUTATION,
  }
  let recordRoutes = {
    editRecord: (prop) => {
      return routes.groupMember(prop)
    },
    createRecord: () => {
      return routes.newGroupMember({ groupId: groupMembers[0].group.id })
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
