import GroupRole from 'src/components/GroupRole/GroupRole'

export const QUERY = gql`
  query FindGroupRoleById($cuid: String!) {
    groupRole: groupRole(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      role
      groupCuid
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
