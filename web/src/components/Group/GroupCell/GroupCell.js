import Group from 'src/components/Group/Group'
import GroupMembersByGroupCell from 'src/components/GroupMembersByGroupCell'

export const QUERY = gql`
  query FindGroupById($id: Int!) {
    group: group(id: $id) {
      id
      createdAt
      updatedAt
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Group not found</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ group }) => {
  return (
    <>
      <Group group={group} />
      <GroupMembersByGroupCell groupID={group} />
    </>
  )
}
