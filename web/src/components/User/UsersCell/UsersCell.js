import { Link, routes } from '@redwoodjs/router'
import Table from 'src/components/Table/Table'
import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'

export const QUERY = gql`
  query FindUsers {
    users {
      id
      createdAt
      updatedAt
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link to={routes.newUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ users }) => {
  let meta = {
    title: 'Users',
    routes: {
      newItem: 'newUser',
      view: 'user',
      edit: 'editUser',
    },
    labels: {
      single: 'user',
      multiple: 'users',
    },
    key: 'id',
    display: 'name',
    columns: [
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'email', label: 'Email', type: 'string' },
      { key: 'createdAt', label: 'Created', type: 'date' },
      { key: 'updatedAt', label: 'Updated', type: 'date' },
    ],
  }
  const DELETE_USER_MUTATION = gql`
    mutation DeleteUserMutation($id: Int!) {
      deleteUser(id: $id) {
        id
      }
    }
  `
  return (
    <>
      <Table
        data={users}
        meta={meta}
        query={QUERY}
        deleteMutation={DELETE_USER_MUTATION}
        updateMutation={UPDATE_USER_MUTATION}
      />
    </>
  )
}
