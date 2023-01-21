import Group from 'src/components/Group/Group'

export const QUERY = gql`
  query FindGroupById($cuid: String!) {
    group: group(cuid: $cuid) {
      cuid
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
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ group }) => {
  return <Group group={group} />
}
