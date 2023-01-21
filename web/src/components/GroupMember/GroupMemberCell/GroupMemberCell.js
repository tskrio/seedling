import GroupMember from 'src/components/GroupMember/GroupMember'

export const QUERY = gql`
  query FindGroupMemberById($cuid: String!) {
    groupMember: groupMember(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      userCuid
      groupCuid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>GroupMember not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ groupMember }) => {
  return <GroupMember groupMember={groupMember} />
}
