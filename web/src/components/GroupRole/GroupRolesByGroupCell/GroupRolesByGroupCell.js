import { useParams, Link, routes, useLocation } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($id: Int!) {
    deleteGroupRole(id: $id) {
      id
    }
  }
`
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

export const QUERY = gql`
  query FindGroupRolesByGroupQuery($id: Int!, $filter: String, $skip: Int) {
    groupRoles: groupRolesByGroup(id: $id, filter: $filter, skip: $skip) {
      count
      take
      skip
      results {
        id
        role
        groupId
        group {
          id
          name
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
      {`No Group Roles yet.`}
      <Link to={routes.newGroupRole({ groupId: id })} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupRoles }) => {
  let title = 'Group Roles by Group'
  let table = 'groupRole'
  let columns = [
    {
      Header: 'Group',
      accessor: 'groupLink',
    },
    {
      Header: 'Role',
      accessor: 'role',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]
  let data = groupRoles.results.map((groupRole) => {
    return {
      ...groupRole,
      groupLink: (
        <Link to={routes.group({ id: groupRole.group.id })}>
          {groupRole.group.name}
        </Link>
      ),
    }
  })
  let queries = {
    QUERY: QUERY,
    DELETEMUTATION: DELETE_GROUP_ROLE_MUTATION,
  }
  let recordRoutes = {
    editRecord: (prop) => {
      return routes.groupRole(prop)
    },
    createRecord: () => {
      return routes.newGroupRole()
    },
    readRecords: (props) => {
      return routes.groupRoles(props)
    },
  }
  let display = 'id'
  let roles = {
    createRecord: ['groupRoleCreate'],
    updateRecord: ['groupRoleUpdate'],
    readRecord: ['groupRoleRead'],
    deleteRecord: ['groupRoleDelete'],
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
      count={groupRoles.count}
      table={table}
    />
  )
}
