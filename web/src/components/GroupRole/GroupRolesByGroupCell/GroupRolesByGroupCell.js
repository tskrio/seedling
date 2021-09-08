import GroupRoles from 'src/components/GroupRole/GroupRoles'
import GroupRolesLayout from 'src/layouts/GroupRolesLayout'
export const beforeQuery = (props) => {
  console.log('variables', props)
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
  //return <div>{JSON.stringify(groupRoles)}</div>
  let query = `Where group = ${groupRoles[0].group.name}`
  return (
    <GroupRolesLayout query={query}>
      <GroupRoles groupRoles={groupRoles} />
    </GroupRolesLayout>
  )
}
