import { Link, routes, useLocation } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
export const beforeQuery = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  return {
    variables: {
      filter: params.get('filter'),
      skip: parseInt(params.get('offset'), 10) || 0,
    },
    fetchPolicy: 'no-cache',
  }
}
const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($id: Int!) {
    deleteGroupRole(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query FindGroupRoles($filter: String, $skip: Int) {
    groupRoles(filter: $filter, skip: $skip) {
      count
      take
      skip
      results {
        id
        groupId
        group {
          name
          id
          description
        }
        role
      }
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupRoles }) => {
  let title = 'Group Roles'
  let columns = [
    {
      Header: 'Group',
      accessor: 'group.name',
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
      //createdAt: new Date(
      //  groupRole.createdAt
      //).toLocaleString(/**TODO: User preference! */),
      //updatedAt: new Date(
      //  groupRole.createdAt
      //).toLocaleString(/**TODO: User preference! */),
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
      count={groupRoles.count}
      skip={groupRoles.skip}
      take={groupRoles.take}
    />
  )
}
