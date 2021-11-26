import TableComponent from 'src/components/TableComponent'
import { useParams, Link, routes, useLocation } from '@redwoodjs/router'
export const beforeQuery = (props) => {
  return {
    variables: {
      id: props.userID.id,
    },
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
      count
      take
      skip
      results {
        id
        user {
          name
          id
        }
        group {
          name
          id
        }
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
  const { pathname } = useLocation()
  let userId = pathname.split('/')[2]
  let title = 'Group memberships'
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

  let data = groupMembers.results.map((groupMember) => {
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
      // TODO: FEAT figure out way to add ... select for this user even if they dont appear in reference field
      return routes.newGroupMember({ userId })
    },
    readRecords: () => {
      return routes.groupMembers({ userId })
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
      enableSearch={false}
      count={groupMembers.count}
    />
  )
}
