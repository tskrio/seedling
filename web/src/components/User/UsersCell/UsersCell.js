import { Link, routes, useLocation } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`
export const beforeQuery = () => {
  const { search } = useLocation()
  let params = new URLSearchParams(search)

  //console.log(params.get('filter'))
  return {
    variables: {
      filter: params.get('filter'),
    },
  }
}
export const QUERY = gql`
  query FindUsers($filter: String) {
    users(filter: $filter) {
      id
      createdAt
      updatedAt
      #email
      name
      GroupMember {
        id
        group {
          id
          name
        }
      }
      Preference {
        id
      }
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
  //  console.log('loaded users', new Date().toLocaleTimeString())
  let title = 'Users'
  let columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    //{
    //  Header: 'Email',
    //  accessor: 'email',
    //},
    {
      Header: 'Group Memberships',
      accessor: 'groupMemberships',
    },
    {
      Header: 'Preferences',
      accessor: 'Preference.length',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]
  let data = users.map((user) => {
    //console.log(user)
    let memberships = user.GroupMember.map((membership) => {
      return (
        <div key={membership.id}>
          <Link
            key={membership.id}
            to={routes.group({ id: membership.group.id })}
          >
            {membership.group.name}
          </Link>
          <br />
        </div>
      )
    })
    let name = <Link to={routes.user({ id: user.id })}>{user.name}</Link>
    //console.log(memberships)
    return {
      ...user,
      name,
      groupMemberships: memberships,
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
    readRecords: (props) => {
      return routes.users(props)
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
