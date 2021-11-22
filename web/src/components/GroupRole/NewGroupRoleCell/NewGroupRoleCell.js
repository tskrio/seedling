export const QUERY = gql`
  query getGroups {
    groups {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ newGroupRole }) => {
  return <div>{JSON.stringify(newGroupRole)}</div>
}
