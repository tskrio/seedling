import { Link, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import TableComponent from 'src/components/TableComponent'
const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`
export const beforeQuery = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  return {
    variables: {
      q: params.get('q'),
      filter: params.get('filter'),
      skip: parseInt(params.get('offset'), 10) || 0,
    },
    fetchPolicy: 'no-cache',
  }
}
export const QUERY = gql`
  query FindUsers($filter: String, $skip: Int, $q: String) {
    users(filter: $filter, skip: $skip, q: $q) {
      count
      take
      skip
      q
      results {
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
      Header: 'Name',
      accessor: 'name',
    },
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
  let data = users.results.map((user) => {
    let memberships = user.GroupMember.map((membership) => {
      return (
        <div key={membership.id}>
          <Link
            alt={`Link to ${membership.group.name}`}
            title={`Link to ${membership.group.name}`}
            key={membership.id}
            to={routes.group({ id: membership.group.id })}
          >
            {membership.group.name}
          </Link>
          {/*{' --- '}
          <Link
            to={routes.groupMembers({
              q: JSON.stringify({
                AND: [{ groupId: membership.group.id }],
              }),
            })}
          >
            show matching
          </Link>
          <br />*/}
        </div>
      )
    })
    //q: JSON.stringify({ AND: [JSON.parse(st)] }),
    let name = (
      <>
        <Link title={user.name} to={routes.user({ id: user.id })}>
          {user.name}
        </Link>
        {/*{' --- '}
        <Link
          to={routes.users({ q: JSON.stringify({ AND: [{ id: user.id }] }) })}
        >
          show matching
        </Link>*/}
      </>
    )
    return {
      ...user,
      name,
      groupMemberships: memberships || <div> 0 </div>,
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
    <>
      <MetaTags
        title="Users"
        description="All users"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <TableComponent
        title={title}
        columns={columns}
        data={data}
        queries={queries}
        routes={recordRoutes}
        display={display}
        roles={roles}
        queryVariables={queryVariables}
        count={users.count}
        skip={users.skip}
        take={users.take}
        q={users.q}
      />
    </>
  )
}
