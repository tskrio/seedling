import { Link, routes } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`
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
  let title = 'Users'
  let columns = [
    {
      Header: 'Created At',
      accessor: 'createdAt', // accessor is the "key" in the data
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]
  let data = users.map((user) => {
    return {
      ...user,
      createdAt: new Date(
        user.createdAt
      ).toLocaleString(/**TODO: User preference! */),
      updatedAt: new Date(
        user.createdAt
      ).toLocaleString(/**TODO: User preference! */),
    }
  })
  let queries = {
    QUERY: QUERY,
    DELETEMUTATION: DELETE_USER_MUTATION,
  }
  let recordRoutes = {
    editRecord: (prop) => {
      return routes.user(prop)
    },
    createRecord: () => {
      return routes.newUser()
    },
  }
  let display = 'id'
  let roles = {
    createRecord: ['userCreate'],
    updateRecord: ['userUpdate'],
    readRecord: ['userRead'],
    deleteRecord: ['userDelete'],
  }
  let queryVariables = {}
  return (
    <TableComponent
      title={title}
      columns={columns}
      data={data}
      queries={queries}
      routes={recordRoutes}
      display={display}
      roles={roles}
      queryVariables={queryVariables}
    />
  )
}
