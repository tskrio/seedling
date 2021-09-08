import GroupRoles from 'src/components/GroupRole/GroupRoles'
import GroupRolesLayout from 'src/layouts/GroupRolesLayout'
export const beforeQuery = (props) => {
  console.log('variables', props)
  /*props.id = props.groupID.id
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }*/
}

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
  //  return <div>{JSON.stringify(groupRoles)}</div>

  return (
    <GroupRolesLayout>
      <GroupRoles groupRoles={groupRoles} />
    </GroupRolesLayout>
  )
}
