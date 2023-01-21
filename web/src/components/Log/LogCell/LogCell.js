import Log from 'src/components/Log/Log'

export const QUERY = gql`
  query FindLogById($cuid: String!) {
    log: log(cuid: $cuid) {
      cuid
      createdAt
      message
      source
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Log not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ log }) => {
  return <Log log={log} />
}
