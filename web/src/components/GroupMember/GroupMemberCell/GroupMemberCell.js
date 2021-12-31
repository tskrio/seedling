import GroupMember from 'src/components/GroupMember/GroupMember'

export const QUERY = gql`
  query FindGroupMemberById($id: Int!) {
    groupMember: groupMember(id: $id) {
      id
      createdAt
      updatedAt
      userId
      groupId
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
