import { routes } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
import GroupRolesLayout from 'src/layouts/GroupRolesLayout'
const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($id: Int!) {
    deleteGroupRole(id: $id) {
      id
    }
  }
`
export const beforeQuery = (props) => {
  //console.log('variables', props)
  props.id = props.groupID.id
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }
}

export const QUERY = gql`
  query FindGroupRolesByGroupQuery($id: Int!) {
    groupRoles: groupRolesByGroup(id: $id) {
      id
      createdAt
      updatedAt
      role
      groupId
      group {
        id
        name
      }
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <GroupRolesLayout />
}

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
  //  let meta = {
  //    title: 'Group Roles',
  //    routes: {
  //      newItem: () => {
  //        return routes.newGroupRole({ groupId: groupRoles[0].group.id })
  //      },
  //      view: (prop) => {
  //        return routes.groupRole(prop)
  //      },
  //      edit: (prop) => {
  //        return routes.editGroupRole(prop)
  //      },
  //    },
  //    labels: {
  //      single: 'Group Role',
  //      multiple: 'Group Roles',
  //    },
  //    key: 'id',
  //    display: 'name',
  //    columns: [
  //      { key: 'role', label: 'Role', type: 'string' },
  //      { key: 'group.name', label: 'Group', type: 'reference' },
  //      { key: 'createdAt', label: 'Created', type: 'date' },
  //      { key: 'updatedAt', label: 'Updated', type: 'date' },
  //    ],
  //    createRoles: ['groupRoleCreate'],
  //    readRoles: ['groupRoleRead'],
  //    updateRoles: ['groupRoleUpdate'],
  //    deleteRoles: ['groupRoleDelete'],
  //  }
  //  const DELETE_GROUP_ROLE_MUTATION = gql`
  //    mutation DeleteGroupRoleMutation($id: Int!) {
  //      deleteGroupRole(id: $id) {
  //        id
  //      }
  //    }
  //  `
  //  return (
  //    <>
  //      <Table
  //        data={groupRoles}
  //        meta={meta}
  //        queryVariables={{ id: groupRoles[0].group.id }} // I don't know how to get the groupID from the query... so if there's a result, refresh the page
  //        query={QUERY}
  //        deleteMutation={DELETE_GROUP_ROLE_MUTATION}
  //      />
  //    </>
  //  )
}
