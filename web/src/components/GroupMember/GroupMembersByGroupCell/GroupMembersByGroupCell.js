import { useParams, Link, routes, useLocation } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
export const beforeQuery = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search } = useLocation()
  let params = new URLSearchParams(search)

  return {
    variables: {
      filter: params.get('filter'),
      skip: parseInt(params.get('offset'), 10) || 0,
      id: props.groupID.id,
    },
    fetchPolicy: 'no-cache',
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
  query getGroupMembersFromGroup($id: Int!, $filter: String, $skip: Int) {
    groupMembers: groupMembersByGroup(id: $id, filter: $filter, skip: $skip) {
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
  const { pathname } = useLocation()
  let groupId = pathname.split('/')[2]
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
      return routes.newGroupMember({
        // TODO: FEAT figure out way to add ... select for this user even if they dont appear in reference field
        groupId: groupId,
      })
    },
    readRecords: (props) => {
      return routes.groupMembers(props)
    },
    readFilteredRecords: () => {
      return routes.groupMembers({ filter: groupId })
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
      count={groupMembers.count}
      skip={groupMembers.skip}
      take={groupMembers.take}
      enableSearch={false}
    />
  )
}
