import Table from 'src/components/Table/Table'
import { routes } from '@redwoodjs/router'
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
  //return <div>{JSON.stringify(groupRoles)}</div>
  //
  //return (
  //    <GroupRoles groupRoles={groupRoles} />
  //)
  let meta = {
    title: 'Group Roles',
    routes: {
      newItem: () => {
        return routes.newGroupRole()
      },
      view: (prop) => {
        return routes.groupRole(prop)
      },
      edit: (prop) => {
        return routes.editGroupRole(prop)
      },
    },
    labels: {
      single: 'grouprole',
      multiple: 'grouproles',
    },
    key: 'id',
    display: 'name',
    columns: [
      { key: 'role', label: 'Role', type: 'string' },
      { key: 'group.name', label: 'Group', type: 'reference' },
      { key: 'createdAt', label: 'Created', type: 'date' },
      { key: 'updatedAt', label: 'Updated', type: 'date' },
    ],
  }
  return (
    <>
      <Table
        data={groupRoles}
        meta={meta}
        query={QUERY}
        deleteMutation={DELETE_GROUP_ROLE_MUTATION}
      />
    </>
  )
}
