import Table from 'src/components/Table/Table'
import { routes } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
export const beforeQuery = (props) => {
  console.log('variables', props)
}
const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($id: Int!) {
    deleteGroupRole(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query FindGroupRoles {
    groupRoles {
      id
      createdAt
      updatedAt
      groupId
      group {
        name
        id
        description
      }
      role
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupRoles }) => {
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
  let data = groupRoles
  let queries = {
    QUERY: QUERY,
    DELETEMUTATION: DELETE_GROUP_ROLE_MUTATION,
  }
  let recordRoutes = {
    editRecord: (prop) => {
      return routes.editGroupRole(prop)
    },
    createRecord: () => {
      return routes.newGroupRole()
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
