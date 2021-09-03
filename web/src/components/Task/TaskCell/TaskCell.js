import Task from 'src/components/Task/Task'

export const QUERY = gql`
  query FindTaskById($id: Int!) {
    task: task(id: $id) {
      id
      createdAt
      updatedAt
      title
      state
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Task not found</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ task }) => {
  return <Task task={task} />
}
