import GroupRole from 'src/components/GroupRole/GroupRole'

export const QUERY = gql`
  query FindGroupRoleById($id: Int!) {
    groupRole: groupRole(id: $id) {
      id
      createdAt
      updatedAt
      role
      groupId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>GroupRole not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ groupRole }) => {
  return <GroupRole groupRole={groupRole} />
}
