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
    response: groupMembersByUser(id: $id) {
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

export const Success = ({ response }) => {
  let single = 'groupMember'
  let plural = 'groupMembers'
  let Single = 'GroupMember'
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

  let data = response.results.map((record) => {
    return {
      ...record,
      userLink: (
        <Link to={routes.user({ id: record.user.id })}>{record.user.name}</Link>
      ),
      groupLink: (
        <Link to={routes.group({ id: record.group.id })}>
          {record.group.name}
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
      return routes[single](prop)
    },
    createRecord: () => {
      // TODO: FEAT figure out way to add ... select for this user even if they dont appear in reference field
      return routes[`new${Single}`]({ userId })
    },
    readRecords: () => {
      return routes[plural]({ userId })
    },
  }
  let display = 'id'
  let roles = {
    createRecord: [`${single}Create`],
    updateRecord: [`${single}Update`],
    readRecord: [`${single}Read`],
    deleteRecord: [`${single}Delete`],
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
      count={response.count}
      table={single}
    />
  )
}
