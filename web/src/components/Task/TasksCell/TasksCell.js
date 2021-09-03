import { Link, routes } from '@redwoodjs/router'

import Tasks from 'src/components/Task/Tasks'

export const QUERY = gql`
  query FindTasks {
    tasks {
      id
      createdAt
      updatedAt
      title
      state
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tasks yet. '}
      <Link to={routes.newTask()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ tasks }) => {
  return <Tasks tasks={tasks} />
}
