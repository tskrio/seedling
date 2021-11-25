import TableComponent from 'src/components/TableComponent'
import { useParams, Link, routes } from '@redwoodjs/router'
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
  const { id } = useParams()
  return (
    <div className="rw-text-center">
      {`No Group Members yet.`}
      <Link to={routes.newGroupMember({ userId: id })} className="rw-link">
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
      Header: 'User',
      accessor: 'userLink',
    },
    {
      Header: 'Group',
      accessor: 'groupLink',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]

  let data = groupMembers.map((groupMember) => {
    return {
      ...groupMember,
      userLink: (
        <Link to={routes.user({ id: groupMember.user.id })}>
          {groupMember.user.name}
        </Link>
      ),
      groupLink: (
        <Link to={routes.group({ id: groupMember.group.id })}>
          {groupMember.group.name}
        </Link>
      ),
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
      return routes.newGroupMember({ userId: groupMembers[0].user.id })
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
