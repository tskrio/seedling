import GroupMember from 'src/components/GroupMember/GroupMember'

export const QUERY = gql`
  query FindGroupMemberById($id: Int!) {
    groupMember: groupMember(id: $id) {
      results {
        id
        createdAt
        updatedAt
        userId
        groupId
        user {
          name
          id
        }
        group {
          name
          id
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>GroupMember not found</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groupMember }) => {
  console.log(groupMember)
  return <GroupMember groupMember={groupMember} />
}
