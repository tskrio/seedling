import GroupRolesLayout from 'src/layouts/GroupRolesLayout'

import Table from 'src/components/Table/Table'
import { routes } from '@redwoodjs/router'
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
  // let query = `Where group = ${groupRoles[0].group.name}`
  // return (
  //   <GroupRolesLayout query={query}>
  //     <GroupRoles groupRoles={groupRoles} />
  //   </GroupRolesLayout>
  // )
  let meta = {
    title: 'Group Roles',
    routes: {
      newItem: () => {
        return routes.newGroupRole({ groupId: groupRoles[0].group.id })
      },
      view: (prop) => {
        return routes.groupRole(prop)
      },
      edit: (prop) => {
        return routes.editGroupRole(prop)
      },
    },
    labels: {
      single: 'Group Role',
      multiple: 'Group Roles',
    },
    key: 'id',
    display: 'name',
    columns: [
      { key: 'role', label: 'Role', type: 'string' },
      { key: 'group.name', label: 'Group', type: 'reference' },
      { key: 'createdAt', label: 'Created', type: 'date' },
      { key: 'updatedAt', label: 'Updated', type: 'date' },
    ],
    createRoles: ['groupRoleCreate'],
    readRoles: ['groupRoleRead'],
    updateRoles: ['groupRoleUpdate'],
    deleteRoles: ['groupRoleDelete'],
  }
  const DELETE_GROUP_ROLE_MUTATION = gql`
    mutation DeleteGroupRoleMutation($id: Int!) {
      deleteGroupRole(id: $id) {
        id
      }
    }
  `
  return (
    <>
      <Table
        data={groupRoles}
        meta={meta}
        queryVariables={{ id: groupRoles[0].group.id }} // I don't know how to get the groupID from the query... so if there's a result, refresh the page
        query={QUERY}
        deleteMutation={DELETE_GROUP_ROLE_MUTATION}
      />
    </>
  )
}
